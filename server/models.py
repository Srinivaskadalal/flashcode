from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime
from typing import List, Optional


class EventModel(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10)
    date: str = Field(..., regex=r"^\d{4}-\d{2}-\d{2}$")  
    time: str = Field(..., regex=r"^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$")  
    location: str = Field(..., min_length=3, max_length=100)
    link: HttpUrl
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BlogModel(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    content: str  
    author: str
    tags: List[str] = Field(default=[])
    created_at: datetime = Field(default_factory=datetime.utcnow)
    image_url: Optional[HttpUrl] = None 


class BlogUpdateModel(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=100)
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    image_url: Optional[HttpUrl] = None
