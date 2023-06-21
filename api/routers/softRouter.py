from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.softSchema import SoftwareCreate, SoftwareUpdate, Software
from models.softModel import Software as SoftwareModel
from database import SessionLocal, get_db

router = APIRouter()


@router.get("/software/{software_id}", response_model=Software)
def get_software(software_id: int, db: Session = Depends(get_db)):
    software = db.query(SoftwareModel).filter(SoftwareModel.id == software_id).first()
    if not software:
        raise HTTPException(status_code=404, detail="Software not found")
    return software


@router.post("/software", response_model=Software)
def create_software(software: SoftwareCreate, db: Session = Depends(get_db)):
    db_software = SoftwareModel(**software.dict())
    db.add(db_software)
    db.commit()
    db.refresh(db_software)
    return db_software


@router.put("/software/{software_id}", response_model=Software)
def update_software(software_id: int, software: SoftwareUpdate, db: Session = Depends(get_db)):
    db_software = db.query(SoftwareModel).filter(SoftwareModel.id == software_id).first()
    if not db_software:
        raise HTTPException(status_code=404, detail="Software not found")
    for field, value in software.dict().items():
        if value is not None:
            setattr(db_software, field, value)
    db.commit()
    db.refresh(db_software)
    return db_software


@router.delete("/software/{software_id}")
def delete_software(software_id: int, db: Session = Depends(get_db)):
    db_software = db.query(SoftwareModel).filter(SoftwareModel.id == software_id).first()
    if not db_software:
        raise HTTPException(status_code=404, detail="Software not found")
    db.delete(db_software)
    db.commit()
    return {"message": "Software deleted successfully"}


@router.get("/software", response_model=List[Software])
def get_all_software(db: Session = Depends(get_db)):
    software = db.query(SoftwareModel).all()
    return software


@router.get("/software/licenses/{license}", response_model=List[Software])
def get_software_by_license(license: str, db: Session = Depends(get_db)):
    software = db.query(SoftwareModel).filter(SoftwareModel.licenses.ilike(f"%{license}%")).all()
    return software


@router.get("/software/platforms/{platform}", response_model=List[Software])
def get_software_by_platform(platform: str, db: Session = Depends(get_db)):
    software = db.query(SoftwareModel).filter(SoftwareModel.platforms.ilike(f"%{platform}%")).all()
    return software


@router.get("/software/tags/{tag}", response_model=List[Software])
def get_software_by_tag(tag: str, db: Session = Depends(get_db)):
    software = db.query(SoftwareModel).filter(SoftwareModel.tags.ilike(f"%{tag}%")).all()
    return software
