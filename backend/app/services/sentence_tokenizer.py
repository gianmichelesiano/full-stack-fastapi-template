from openai import OpenAI
import json
from typing import List, Dict, Optional
import os

class SentenceTokenizer:
    def __init__(self, api_key: str):
        """
        Initialize the tokenizer with an OpenAI API key.
        
        Args:
            api_key: OpenAI API key
        """
        # Disabilita temporaneamente le variabili d'ambiente proxy
        original_http_proxy = os.environ.pop('HTTP_PROXY', None)
        original_https_proxy = os.environ.pop('HTTPS_PROXY', None)
        
        try:
            # Inizializza il client senza proxy
            self.client = OpenAI(api_key=api_key)
        finally:
            # Ripristina le variabili d'ambiente originali
            if original_http_proxy:
                os.environ['HTTP_PROXY'] = original_http_proxy
            if original_https_proxy:
                os.environ['HTTPS_PROXY'] = original_https_proxy
        
    def tokenize_sentence(self, sentence: str) -> Optional[str]:
        """
        Tokenize a sentence into key tokens using OpenAI.
        
        Args:
            sentence: The sentence to tokenize
            
        Returns:
            String containing the tokenized result
        """
        try:
            completion = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an assistant that transforms sentences into key tokens. "
                                 "Simplify the sentence by using only key and simple words. "
                                 "Remove articles and pronouns and convert verbs to infinitive form. "
                                 "Return only the key words in quotes, separated by spaces."
                                 "Replace proper names of people with nouns like boy, girl, dad, mom, dog, depending on context. "
                                 "Correct any misspelled words, for example 'andre' to 'andare' or 'booling' to 'bowling'"
                    },
                    {
                        "role": "user",
                        "content": f"Transform the sentence '{sentence}' into key tokens, "
                                 f"removing articles and pronouns and converting verbs to infinitive form. Return only the key words in quotes, separated by commas."
                    }
                ]
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error during processing: {str(e)}"
        

    def find_missing_word(self, sentence: str, missing: str, options_list: str) -> Optional[str]:
        """
        Find a suitable replacement for a missing word from a list of options.
        
        Args:
            sentence: The original sentence
            missing: The missing word
            options_list: Comma-separated list of options
            
        Returns:
            JSON string containing the found word
        """
        try:
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",  
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert at finding synonyms for words"                                 
                    },
                    {
                        "role": "user",
                        "content": f"Given this sentence '{sentence}' and the missing word is '{missing}', and this list of options: {options_list}, "
                                   f"Understand the context and replace the missing word with one from the list."
                                   f"Return a single word from the list in JSON format found: found_word"
                    }
                ]
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            return f"Error during processing: {str(e)}"