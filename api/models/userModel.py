import enum

from sqlalchemy import Column, Integer, String, Boolean, JSON , Enum

from database import Base

class Role(enum.Enum):
    ADMIN = "ADMIN"
    PATIENT = "PATIENT"
    DOC = "DOC"

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    phone_number = Column(String)
    mac_address = Column(String)
    role = Column("enum",Enum(Role))
    hashed_password = Column(String)
