from src.domain.owner import Owner
from src.core.database import SessionLocal

class OwnerService:
    def __init__(self, graphql_client):
        self.graphql_client = graphql_client

    def get_owners(self):
        query = """
        {
          owners {
            idCard
            firstName
            lastName
            email
            phone
          }
        }
        """
        data = self.graphql_client.execute_query(query)
        owners_data = data.get("owners", [])
        
        db = SessionLocal()
        for owner_data in owners_data:
            owner = Owner(
                id_card=owner_data["idCard"],
                first_name=owner_data["firstName"],
                last_name=owner_data["lastName"],
                email=owner_data["email"],
                phone=owner_data["phone"]
            )
            db.merge(owner)  
        db.commit()
        db.close()

        return owners_data
