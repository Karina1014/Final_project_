from src.domain.vaccine import Vaccine
from src.core.database import SessionLocal

class VaccineService:
    def __init__(self, graphql_client):
        self.graphql_client = graphql_client

    def get_vaccines(self):
        query = """
        {
          vaccines {
            id
            name
            description
            dose
          }
        }
        """
        data = self.graphql_client.execute_query(query)
        
        vaccines_data = data.get("vaccines", [])

        db = SessionLocal()
        for vaccine_data in vaccines_data:
            vaccine = Vaccine(
                id=vaccine_data["id"],
                name=vaccine_data["name"],
                description=vaccine_data.get("description"),
                dose=vaccine_data.get("dose")
            )
            db.merge(vaccine)
        db.commit()
        db.close()

        return vaccines_data
