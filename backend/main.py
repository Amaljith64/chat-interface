# backend/app/main.py
from fastapi import FastAPI, APIRouter
from urllib.parse import urlparse
from fastapi.middleware.cors import CORSMiddleware
from api.routes import auth_routes,chat_routes,data_routes
from core.config import get_settings


settings = get_settings()

api_router = APIRouter()

app = FastAPI(title=settings.PROJECT_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_routes.router, prefix="/api/data", tags=["data"])
app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat_routes.router, prefix="/api/chat", tags=["chat"])


@app.get("/")
async def root():
    return {"message": "Welcome to the Website Chat API"}