from pydantic import BaseModel
from typing import List, Optional

class SoftwareBase(BaseModel):
    archived: Optional[bool] = False
    demo_url: Optional[str]
    depends_3rdparty: Optional[str]
    description: Optional[str]
    licenses: List[str]
    name: str
    platforms: List[str]
    related_software_url: Optional[str]
    source_code_url: Optional[str]
    stargazers_count: Optional[int]
    tags: List[str]
    updated_at: Optional[str]
    website_url: Optional[str]

class SoftwareCreate(SoftwareBase):
    pass

class SoftwareUpdate(SoftwareBase):
    pass

class Software(SoftwareBase):
    id: int

    class Config:
        orm_mode = True
