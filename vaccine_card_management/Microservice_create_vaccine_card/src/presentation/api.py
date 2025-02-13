from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from src.core.database import get_db
from typing import List
from src.application.vaccine_card_service import VaccineCardService
from src.infrastructure.vaccine_card_repository import VaccineCardRepository

app = FastAPI()
db = get_db()
repository = VaccineCardRepository(db) 
service = VaccineCardService(repository)

router = APIRouter()

@router.get("/")
def home():
    return {"message": "Hello from API"}

class VaccineCardRequest(BaseModel):
    dog_name: str
    owner_id: str
    vaccine_names: List[str]

@router.post("/vaccine_card")
def create_vaccine_card(request: VaccineCardRequest):
    result = service.create_vaccine_card(request.dog_name, request.owner_id, request.vaccine_names)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result
