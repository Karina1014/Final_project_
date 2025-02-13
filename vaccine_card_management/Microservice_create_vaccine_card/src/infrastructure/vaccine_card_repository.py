from pymongo.database import Database

class VaccineCardRepository:
    def __init__(self, db):
        self.collection = db["vaccine_cards"] if db is not None else None

    def save(self, vaccine_card: dict):
        if self.collection is None:
            raise ValueError("Database not initialized")
        result = self.collection.insert_one(vaccine_card)
        return str(result.inserted_id)

