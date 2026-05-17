from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.ai.gemini_service import client
from app.database.connection import engine
from sqlalchemy import text, inspect
import pandas as pd
import re

sql_router = APIRouter()

class QueryRequest(BaseModel):
    table_name: str
    query: str

@sql_router.get("/health")
async def health_check():
    return {"status": "SQL Analytics Service is online"}

def get_table_schema(table_name: str):
    """
    Fetch the column names and types for a given table to provide context to Gemini.
    """
    try:
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)
        if not columns:
            return None
        return ", ".join([f"{col['name']} ({col['type']})" for col in columns])
    except Exception:
        return None

@sql_router.post("/execute")
async def generate_and_execute_sql(request: QueryRequest):
    """
    Converts a natural language prompt into SQL using Gemini, then executes it.
    """
    table_name = request.table_name
    query = request.query
    
    if not table_name or not query:
        raise HTTPException(status_code=400, detail="Missing 'table_name' or 'query' in request body.")

    # 1. Validate Table Existence and Get Schema
    schema_info = get_table_schema(table_name)
    if not schema_info:
        raise HTTPException(status_code=404, detail=f"Table '{table_name}' not found.")


    # 2. Construct Prompt for Gemini
    prompt = f"""
    You are an expert PostgreSQL developer. 
    Given the table '{table_name}' with the following columns: {schema_info}.
    Convert the following natural language request into a valid, safe PostgreSQL SQL query:
    "{query}"

    
    Rules:
    - Return ONLY the raw SQL query.
    - Do not include any markdown formatting like ```sql or extra text.
    - Ensure the query is read-only (SELECT statements only).
    - ALWAYS wrap column names in double quotes (e.g., "Salary", "Department") to preserve exact case sensitivity in PostgreSQL.
    """

    try:
        # 3. Generate SQL using Gemini
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        
        generated_sql = response.text.strip()
        
        # Clean up Gemini response if it includes markdown blocks
        generated_sql = re.sub(r'```sql\n?|```', '', generated_sql).strip()

        # 4. Basic Security Check (Ensure it's a SELECT query)
        if not generated_sql.lower().startswith("select"):
            raise HTTPException(
                status_code=400, 
                detail="Security violation: Only SELECT queries are allowed."
            )

        # 5. Execute Query using SQLAlchemy and Pandas
        with engine.connect() as connection:
            result_df = pd.read_sql_query(text(generated_sql), connection)

        # 6. Return generated SQL and Result
        return {
            "success": True,
            "generated_sql": generated_sql,
            "result_count": len(result_df),
            "data": result_df.to_dict(orient="records")
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Query Execution Error: {str(e)}"
        )
