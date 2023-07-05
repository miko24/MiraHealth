from pydantic import BaseModel
from models.userModel import Role
from typing import List, Optional

class UserBase(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    mac_address: Optional[str]
    role: Optional[Role]
    hashed_password: Optional[str]

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
