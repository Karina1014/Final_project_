from sqlalchemy import Column, String, Integer, LargeBinary
from src.core.config import Base
from sqlalchemy.orm import relationship

class Dog(Base):
    __tablename__ = "dogs"

    name_dog = Column(String, primary_key=True, index=True)
    breed = Column(String, index=True)
    age = Column(Integer, nullable=True)
    gener = Column(String, nullable=True)
    image = Column(LargeBinary, nullable=True)

    def __init__(self, name_dog, breed, age=None, gener=None, image=None):
        self.name_dog = name_dog
        self.breed = breed
        self.age = age
        self.gener = gener
        self.image = image
        
