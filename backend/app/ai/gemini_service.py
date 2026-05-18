import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY", "AIzaSyBRZghbTGqrVY5nQcCFu5s7PEpfYuxtSok")
genai.configure(api_key=api_key)

class ModelsWrapper:
    def generate_content(self, model, contents):
        # Use gemini-1.5-flash as the highly stable default model
        gm = genai.GenerativeModel("gemini-1.5-flash")
        return gm.generate_content(contents)

class ClientWrapper:
    def __init__(self):
        self.models = ModelsWrapper()

client = ClientWrapper()