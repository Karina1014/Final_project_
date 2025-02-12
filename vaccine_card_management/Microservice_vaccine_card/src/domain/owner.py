from sqlalchemy import Column, String
from src.core.config import Base

class Owner(Base):
    __tablename__ = "owners"

    id_card = Column(String, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String)

    def __init__(self, id_card, first_name, last_name, email, phone):
        self.id_card = id_card
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
