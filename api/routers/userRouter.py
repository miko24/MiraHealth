from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.userSchema import UserCreate, UserUpdate, User
from models.userModel import User as UserModel
from database import SessionLocal, get_db
from authentification_management import Verify_password , Create_Token
router = APIRouter()


@router.get("/user/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/user", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.put("/user/{user_id}", response_model=User)
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in user.dict().items():
        if value is not None:
            setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}


@router.get("/user", response_model=List[User])
def get_all_user(db: Session = Depends(get_db)):
    user = db.query(UserModel).all()
    return user

@router.get("/patients", response_model=List[User])
def get_all_patients(db: Session = Depends(get_db)):
    patients = db.query(UserModel).filter(UserModel.role == "PATIENT").all()
    return patients

@router.post("/authentication")
def authenticate(email: str , password: str ,db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user:
        return HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Wrong crendentials",
        )
    if not Verify_password(password, user.hashed_password):
        return HTTPException(
             status_code = status.HTTP_401_UNAUTHORIZED,
             detail="Wrong crendentials",
        )
    jwt_token = Create_Token(data= {"sub": user.email})
    return {"jwt_token": jwt_token, "token_type": "bearer", "name" : user.first_name +" " +  user.last_name, "role": user.role}
