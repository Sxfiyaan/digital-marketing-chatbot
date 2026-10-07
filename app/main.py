from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.chatbot import get_response


app = FastAPI(
    title="Digital Marketing Chatbot",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Digital Marketing Chatbot is running"
    }


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    response = get_response(request.message)

    return {
        "response": response
    }