from src.domain.dog import Dog
from src.core.database import SessionLocal

class DogService:
    def __init__(self, graphql_client):
        self.graphql_client = graphql_client

    def get_dogs(self):
        query = """
        {
          dogs {
            nameDog
            breed
            age
            gener
            image
          }
        }
        """
        data = self.graphql_client.execute_query(query)
        dogs_data = data.get("dogs", [])

        db = SessionLocal()
        for dog_data in dogs_data:
           
            if dog_data.get("image"):
                image_data = dog_data["image"].encode()  # Converts the image to bytes
            else:
                image_data = None

            dog = Dog(
                name_dog=dog_data["nameDog"],
                breed=dog_data["breed"],
                age=dog_data.get("age"),
                gener=dog_data.get("gener"),
                image=image_data 
            )
            db.merge(dog)

        db.commit()
        db.close()

        return dogs_data

        
