import os
import urllib
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

DB_SERVER = os.getenv("DB_SERVER")
DB_NAMEV = os.getenv("DB_NAME")
DB_USERV = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DRIVER = os.getenv("DRIVER")

connection_string = f"DRIVER={DRIVER};SERVER={DB_SERVER};DATABASE={DB_NAMEV};UID={DB_USERV};PWD={DB_PASSWORD};TrustServerCertificate=Yes"
params = urllib.parse.quote_plus(connection_string)

engine = create_engine(f"mssql+pyodbc:///?odbc_connect={params}", echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base() 

