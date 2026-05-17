from fastapi import APIRouter
from app.ai.gemini_service import client

router = APIRouter()


@router.post("/analyze")
async def analyze_dataset():

    try:

        prompt = """
        Analyze this dataset and provide:
        1. Missing value analysis
        2. Duplicate detection
        3. Data quality issues
        4. Suggested preprocessing
        5. Business insights
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "success": True,
            "analysis": response.text
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }