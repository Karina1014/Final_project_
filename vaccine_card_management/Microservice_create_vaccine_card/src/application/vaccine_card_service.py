import requests
from src.infrastructure.vaccine_card_repository import VaccineCardRepository

class VaccineCardService:
    def __init__(self, repository: VaccineCardRepository):
        self.repository = repository

    def fetch_data(self):
        try:
            dogs = requests.get("http://18.215.212.3:9000/dogs").json()
            owners = requests.get("http://18.215.212.3:9000/owners").json()
            vaccines = requests.get("http://18.215.212.3:9000/vaccines").json()
            return dogs, owners, vaccines
        except requests.exceptions.RequestException as e:
            print(f"Error en la petición: {e}")
            return [], [], []


    def create_vaccine_card(self, dog_name, owner_id, vaccine_names):
        dogs, owners, vaccines = self.fetch_data()

        dog = next((d for d in dogs if d["nameDog"] == dog_name), None)
        if not dog:
            return {"error": "Perrito no encontrado"}

        owner = next((o for o in owners if o["idCard"] == owner_id), None)
        if not owner:
            return {"error": "Dueño no encontrado"}

        assigned_vaccines = [v for v in vaccines if v["name"] in vaccine_names]

        vaccine_card = {
            "dog_name": dog["nameDog"],
            "breed": dog["breed"],
            "age": dog["age"],
            "gener": dog["gener"],
            "vaccine_names": [v["name"] for v in assigned_vaccines], 
            "owner_id": owner["idCard"], 
            "owner_name": f"{owner['firstName']} {owner['lastName']}" 
        }
        inserted_id = self.repository.save(vaccine_card)
        vaccine_card["_id"] = str(inserted_id)

        return vaccine_card
