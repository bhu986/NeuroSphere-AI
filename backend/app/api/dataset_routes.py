from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
import os
import re
import threading
from app.database.connection import engine

router = APIRouter()

# Directory to store uploaded datasets locally
UPLOAD_DIR = "datasets"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def sanitize_table_name(filename: str) -> str:
    """
    Sanitize the filename to create a valid PostgreSQL table name.
    """
    name = os.path.splitext(filename)[0]
    name = re.sub(r'[^a-zA-Z0-9]', '_', name)
    name = name.lower()
    if name[0].isdigit():
        name = f"ds_{name}"
    return name

def execute_to_sql_sync(df: pd.DataFrame, table_name: str):
    """
    Synchronous wrapper for SQLAlchemy to_sql execution.
    """
    try:
        print(f"[Detached Daemon Thread] Starting PostgreSQL indexing for '{table_name}'...")
        num_cols = len(df.columns)
        calculated_chunk = max(1, int(60000 / num_cols))
        
        # This uses the connection engine which now has a 5s connect_timeout
        df.to_sql(
            name=table_name,
            con=engine,
            if_exists='replace',
            index=False,
            chunksize=calculated_chunk,
            method='multi'
        )
        print(f"[Detached Daemon Thread] Successfully stored table '{table_name}' in PostgreSQL.")
    except Exception as e:
        print(f"[Detached Daemon Thread] PostgreSQL offline or unreachable for '{table_name}'. Local CSV fallback is fully active. Error: {e}")

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Endpoint to upload a dataset, save it locally, fire a detached daemon thread for PostgreSQL,
    and return metadata instantly without hanging the ASGI HTTP stream.
    """
    filename = file.filename
    clean_filename = filename.lower()
    
    if not (clean_filename.endswith('.csv') or clean_filename.endswith('.xlsx') or clean_filename.endswith('.xls')):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Please upload a CSV or Excel file."
        )

    try:
        # 1. Read file contents
        contents = await file.read()
        
        # 2. Save file locally in datasets/ directory
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(contents)
            
        # 3. Load into Pandas DataFrame for metadata & preview
        file_copy = io.BytesIO(contents)
        if clean_filename.endswith('.csv'):
            try:
                df = pd.read_csv(file_copy, encoding='utf-8')
            except UnicodeDecodeError:
                file_copy.seek(0)
                df = pd.read_csv(file_copy, encoding='latin1')
        else:
            df = pd.read_excel(file_copy)

        table_name = sanitize_table_name(filename)

        # 4. Fire and forget PostgreSQL storage as a detached daemon thread
        # This completely decouples execution from Uvicorn's ASGI event loop
        # preventing HTTP Socket hangs completely!
        thread = threading.Thread(target=execute_to_sql_sync, args=(df.copy(), table_name))
        thread.daemon = True
        thread.start()

        # 5. Sanitize Preview Data to prevent JSON NaN serialization crashes
        preview_df = df.head(10).copy()
        preview_df = preview_df.fillna("")  # Replace NaN/Infinity with empty string
        preview_rows = preview_df.to_dict(orient="records")

        # 6. Return metadata and preview instantly
        return {
            "success": True,
            "message": f"Dataset saved locally. Detached PostgreSQL indexing initiated for '{table_name}'.",
            "data": {
                "filename": filename,
                "table_name": table_name,
                "column_names": list(df.columns),
                "row_count": len(df),
                "preview_rows": preview_rows
            }
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process dataset: {str(e)}"
        )
    finally:
        await file.close()