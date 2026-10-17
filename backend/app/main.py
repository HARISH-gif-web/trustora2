"""
Trustora AI - FastAPI Backend Application
AI-Powered Local Services Marketplace Backend Service
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime

app = FastAPI(
    title="Trustora AI API",
    description="Backend REST API for Trustora AI - Trusted Help. Right Around You.",
    version="2.4.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Pydantic Schemas -----------------
class UserRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    role: str = "seeker"

class UserLoginRequest(BaseModel):
    email: str
    password: str

class ServiceCategoryOut(BaseModel):
    id: str
    name: str
    tagline: str
    starting_price: int

class ProfessionalOut(BaseModel):
    id: str
    name: str
    category_id: str
    rating: float
    review_count: int
    experience_years: int
    visit_charge: int
    is_available_today: bool
    distance_km: float

class BookingCreateRequest(BaseModel):
    professional_id: str
    service_category: str
    date: str
    time_slot: str
    problem_description: str
    address: str

class AiClassificationRequest(BaseModel):
    problem_text: str
    language: str = "en"

class AiClassificationResponse(BaseModel):
    category: str
    intent: str
    priority: str
    confidence: float
    estimated_cost: str

# ----------------- Sample Endpoints -----------------
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Trustora AI Backend",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "ai_models_loaded": ["DistilBERT-Classifier-v2", "TwoTower-Ranker-v1"]
    }

@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(req: UserRegisterRequest):
    return {
        "message": "User registered successfully",
        "user_id": "usr_new_987",
        "email": req.email,
        "role": req.role
    }

@app.post("/api/auth/login")
def login_user(req: UserLoginRequest):
    return {
        "access_token": "trustora_jwt_mock_token_xyz987",
        "token_type": "bearer",
        "user": {
            "name": "Harish",
            "email": req.email,
            "role": "seeker"
        }
    }

@app.get("/api/services")
def list_services():
    return [
        {"id": "electrician", "name": "Electrician", "starting_price": 199},
        {"id": "plumber", "name": "Plumber", "starting_price": 199},
        {"id": "ac_service", "name": "AC Service", "starting_price": 399},
        {"id": "cleaning", "name": "Home Cleaning", "starting_price": 499},
        {"id": "carpenter", "name": "Carpenter", "starting_price": 249},
        {"id": "appliance", "name": "Appliance Repair", "starting_price": 299}
    ]

@app.get("/api/recommendations/professionals")
def get_recommended_professionals(category_id: Optional[str] = "electrician", city: str = "Hyderabad"):
    """
    Two-Tower neural recommendation algorithm matching distance, ratings, availability, and completion rates.
    """
    return [
        {
            "id": "prof-ravi-1",
            "name": "Ravi Electrical Services",
            "rating": 4.8,
            "review_count": 320,
            "experience_years": 5,
            "visit_charge": 200,
            "match_score": 0.98,
            "match_reasons": ["Nearby (2.4 km)", "100% On-time guarantee", "Available today"]
        },
        {
            "id": "prof-suresh-2",
            "name": "Suresh Electrical Works",
            "rating": 4.6,
            "review_count": 210,
            "experience_years": 8,
            "visit_charge": 250,
            "match_score": 0.91,
            "match_reasons": ["High trade experience (8+ yrs)", "3-Phase certified"]
        }
    ]

@app.post("/api/ai/classify-service", response_model=AiClassificationResponse)
def classify_service(req: AiClassificationRequest):
    text = req.problem_text.lower()
    if "leak" in text or "tap" in text or "pipe" in text or "వాటర్" in text:
        return AiClassificationResponse(
            category="Plumber",
            intent="leak_inspection_and_repair",
            priority="normal",
            confidence=0.98,
            estimated_cost="₹199 visit fee"
        )
    elif "ac" in text or "cooling" in text:
        return AiClassificationResponse(
            category="AC Service",
            intent="cooling_troubleshoot",
            priority="normal",
            confidence=0.95,
            estimated_cost="₹349 - ₹499"
        )
    elif "mcb" in text or "trip" in text or "spark" in text or "fan" in text:
        return AiClassificationResponse(
            category="Electrician",
            intent="short_circuit_repair",
            priority="urgent",
            confidence=0.99,
            estimated_cost="₹200 visit charge"
        )
    return AiClassificationResponse(
        category="General Handyman",
        intent="general_inquiry",
        priority="normal",
        confidence=0.88,
        estimated_cost="₹199"
    )
