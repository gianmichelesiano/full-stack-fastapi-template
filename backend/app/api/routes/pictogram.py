from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
import json

from app.models.pictogram import PhraseRequest, WordRequest, PictogramResponse
from app.services.pictogram_search import PictogramSearch, find_id_by_name, create_options_list
from app.services.sentence_tokenizer import SentenceTokenizer
from app.core.config import settings


router = APIRouter(prefix="/pictrogram", tags=["pictrogram"])

# Load pictograms data
with open(settings.PICTOGRAMS_FILE, 'r', encoding='utf-8') as file:
    pictograms_data = json.load(file)

# Initialize services
search_service = PictogramSearch(settings.PICTOGRAMS_FILE)
tokenizer = SentenceTokenizer(settings.API_KEY)

@router.post("/process-phrase", response_model=List[PictogramResponse])
async def process_phrase(request: PhraseRequest):
    """
    Process a phrase and return matching pictograms
    """
    try:
        sentence = request.phrase
        
        print(sentence)
        result = tokenizer.tokenize_sentence(sentence)
        print(result)
        
        # Process tokens and find pictogram IDs
        pictograms = []
        if result:
            single_tokens = result.split(",")
            for token in single_tokens:
                token_clean = token.strip().replace('"', '')
                pictogram_id = find_id_by_name(token_clean, pictograms_data)
                
                if pictogram_id:
                    pictograms.append({
                        "word": token_clean,
                        "id": pictogram_id,
                        "url": f"https://api.arasaac.org/v1/pictograms/{pictogram_id}?download=false"
                    })
                else:
                    # Handle missing pictogram
                    options_list = create_options_list(token_clean, search_service)
                    options_str = ', '.join(options_list)
                    
                    response_text = tokenizer.find_missing_word(sentence, token_clean, options_str)
                    
                    # Clean up the response
                    if response_text:
                        response_text = response_text.replace('```json', '')
                        response_text = response_text.replace('```', '')
                        response_text = response_text.strip()
                    else:
                        pictograms.append({
                            "word": token_clean,
                            "error": "no response from tokenizer"
                        })
                        continue
                    
                    try:
                        data = json.loads(response_text)
                        found_word = data.get('found_word', '')
                        
                        pictogram_id = find_id_by_name(found_word, pictograms_data)
                        if pictogram_id:
                            pictograms.append({
                                "word": token_clean,
                                "id": pictogram_id,
                                "url": f"https://api.arasaac.org/v1/pictograms/{pictogram_id}?download=false"
                            })
                        else:
                            pictograms.append({
                                "word": token_clean,
                                "error": "not found"
                            })
                    except json.JSONDecodeError:
                        pictograms.append({
                            "word": token_clean,
                            "error": "invalid response format"
                        })
        
        return pictograms
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get-options", response_model=List[PictogramResponse])
async def get_options(request: WordRequest):
    """
    Get pictogram options for a word
    """
    try:
        word = request.word
        
        if not word:
            raise HTTPException(status_code=400, detail="Word is required")
        
        pictograms = []
        token_clean = word.strip().replace('"', '')
        pictogram_id = find_id_by_name(token_clean, pictograms_data)
        
        if pictogram_id:
            pictograms.append({
                "word": token_clean,
                "id": pictogram_id,
                "url": f"https://api.arasaac.org/v1/pictograms/{pictogram_id}?download=false"
            })
        else:
            # Get options for the word
            options = create_options_list(word, search_service)
            
            # Remove duplicates while preserving order
            unique_options = list(dict.fromkeys(options))
            
            for item in unique_options:
                pictogram_id = find_id_by_name(item, pictograms_data)
                if pictogram_id:
                    pictograms.append({
                        "word": token_clean,
                        "id": pictogram_id,
                        "url": f"https://api.arasaac.org/v1/pictograms/{pictogram_id}?download=false"
                    })
        
        return pictograms
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
