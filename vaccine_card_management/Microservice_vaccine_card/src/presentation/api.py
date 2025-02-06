from fastapi import APIRouter
from src.application.dog_service import DogService
from src.application.owner_service import OwnerService
from src.application.vaccine_service import VaccineService
from src.infrastructure.repositories.graphql_client import GraphQLClient
from src.core.config import GRAPHQL_URL

router = APIRouter()
graphql_client = GraphQLClient(GRAPHQL_URL)

dog_service = DogService(graphql_client)
owner_service = OwnerService(graphql_client)
vaccine_service = VaccineService(graphql_client)

@router.get("/dogs")
def get_dogs():
    return dog_service.get_dogs()
    
@router.get("/owners")
def get_owners():
    return owner_service.get_owners()

@router.get("/vaccines")
def get_vaccines():
    return vaccine_service.get_vaccines()