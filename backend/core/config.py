import os
from pydantic_settings import BaseSettings
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Chat"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    
    # Database
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET")
    
    
    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]  
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()