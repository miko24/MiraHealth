from sqlalchemy import Column, Integer, String, Boolean, JSON

from database import Base

class Software(Base):
    __tablename__ = "software"

    id = Column(Integer, primary_key=True, index=True)
    archived = Column(Boolean, default=False)
    demo_url = Column(String)
    depends_3rdparty = Column(String)
    description = Column(String)
    licenses = Column(JSON)
    name = Column(String, index=True)
    platforms = Column(JSON)
    related_software_url = Column(String)
    source_code_url = Column(String)
    stargazers_count = Column(Integer)
    tags = Column(JSON)
    updated_at = Column(String)
    website_url = Column(String)
