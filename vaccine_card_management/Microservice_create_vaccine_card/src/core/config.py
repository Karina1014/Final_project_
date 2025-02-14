import os
from dotenv import load_dotenv

load_dotenv()  

class Settings:
    MONGO_LINK = os.getenv("MONGO_LINK")
    MONGO_DB = os.getenv("MONGO_DB")
    GRAPHQL_URL = os.getenv("GRAPHQL_URL")

settings = Settings()
