from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
import os
import re
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
    # Remove extension and take the base name
    name = os.path.splitext(filename)[0]
    # Replace any non-alphanumeric character with an underscore
    name = re.sub(r'[^a-zA-Z0-9]', '_', name)
    # Convert to lowercase and ensure it doesn't start with a number
    name = name.lower()
    if name[0].isdigit():
        name = f"ds_{name}"
    return name

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Endpoint to upload a dataset, store it in PostgreSQL, and return metadata.
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
        
        # 2. Save file locally
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "wb") as f:
            f.write(contents)
            
        # 3. Load into Pandas DataFrame
        file_copy = io.BytesIO(contents)
        if clean_filename.endswith('.csv'):
            try:
                df = pd.read_csv(file_copy, encoding='utf-8')
            except UnicodeDecodeError:
                file_copy.seek(0)
                df = pd.read_csv(file_copy, encoding='latin1')
        else:
            df = pd.read_excel(file_copy)

        # 4. Store in PostgreSQL
        table_name = sanitize_table_name(filename)
        try:
            # to_sql automatically creates the table and handles replacement
            df.to_sql(
                name=table_name,
                con=engine,
                if_exists='replace',
                index=False,
                chunksize=1000
            )
        except Exception as db_err:
            raise HTTPException(
                status_code=500,
                detail=f"Database storage error: {str(db_err)}"
            )

        # 5. Return metadata and preview
        return {
            "success": True,
            "message": f"Dataset stored in table '{table_name}' successfully.",
            "data": {
                "filename": filename,
                "table_name": table_name,
                "column_names": list(df.columns),
                "row_count": len(df),
                "preview_rows": df.head(10).to_dict(orient="records")
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

