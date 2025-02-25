from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class Pictogram(BaseModel):
    """Pictogram model representing a pictogram from the database"""
    id: int
    name: str = Field(..., description="Name of the pictogram")
    
class PictogramResponse(BaseModel):
    """Response model for pictogram search results"""
    word: str
    id: Optional[int] = None
    url: Optional[str] = None
    error: Optional[str] = None

class PhraseRequest(BaseModel):
    """Request model for phrase processing"""
    phrase: str = Field(..., description="Phrase to be processed")

class WordRequest(BaseModel):
    """Request model for word options"""
    word: str = Field(..., description="Word to find options for")
