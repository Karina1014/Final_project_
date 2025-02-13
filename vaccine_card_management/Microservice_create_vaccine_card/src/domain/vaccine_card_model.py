from typing import List, Optional
from pydantic import BaseModel

class VaccineCard(BaseModel):
    id: Optional[str]
    dog_name: str  
    breed: str
    age: int
    gener: str
    vaccine_names: List[str]  
    owner_id: str  
    owner_name: str
