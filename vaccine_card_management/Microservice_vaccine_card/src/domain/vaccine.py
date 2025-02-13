from sqlalchemy import Column, Integer, String
from src.core.config import Base
from sqlalchemy.orm import relationship

class Vaccine(Base):
    __tablename__ = "vaccines"

    id = Column(Integer, primary_key=True, autoincrement=True) 
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    dose = Column(String, nullable=True)

    def __init__(self, name, description=None, dose=None):
        self.name = name
        self.description = description
        self.dose = dose
