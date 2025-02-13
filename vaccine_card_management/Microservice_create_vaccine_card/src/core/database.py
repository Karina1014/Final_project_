from pymongo import MongoClient
from src.core.config import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB]  
collection = db["vaccine_cards"]

if collection is not None:  
    print("La colección existe")

def get_db():
    return db


