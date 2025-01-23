import os
from supabase import create_client
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

# Configuración de las variables de entorno
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def get_supabase():
    """Devuelve una instancia del cliente Supabase."""
    return create_client(SUPABASE_URL, SUPABASE_KEY)