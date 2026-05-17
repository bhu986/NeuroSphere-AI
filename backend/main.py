from app.auth.auth_routes import router as auth_router
from app.database.connection import engine
from app.models.user_model import User
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.dataset_routes import router as dataset_router
from app.analytics.analytics_routes import router as analytics_router
from app.analytics.sql_routes import sql_router
app = FastAPI(
    title="NeuroSphere AI",
    version="1.0.0"
)


User.metadata.create_all(bind=engine)
app.include_router(auth_router, prefix="/auth")
app.include_router(dataset_router, prefix="/dataset")
app.include_router(
    analytics_router,
    prefix="/analytics"
)
app.include_router(sql_router, prefix="/sql")
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "NeuroSphere AI Backend Running"
    }

# Application Ready
