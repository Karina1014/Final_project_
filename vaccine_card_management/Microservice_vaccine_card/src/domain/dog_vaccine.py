from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import func
from src.core.config import Base

class DogVaccine(Base):
    __tablename__ = "dog_vaccine"

    dog_id = Column(Integer, ForeignKey('dogs.name_dog'), primary_key=True)
    vaccine_id = Column(Integer, ForeignKey('vaccines.id'), primary_key=True)
    date_administered = Column(DateTime, default=func.now()) 

    dog = relationship("Dog", back_populates="vaccines")
    vaccine = relationship("Vaccine", back_populates="dogs")

