import os
from dotenv import load_dotenv
from supabase import create_client, Client
from groq import Groq

load_dotenv()


supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)
gorq_client = Groq(api_key=os.getenv("GROQ_API_KEY"),)