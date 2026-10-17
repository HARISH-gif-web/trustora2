"""
Trustora AI - SQLAlchemy Relational Database Models
PostgreSQL Normalized Schemas with pgvector extension support
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import declarative_base, relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="seeker")  # seeker, provider, admin
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    customer_profile = relationship("CustomerProfile", back_populates="user", uselist=False)
    provider_profile = relationship("ProfessionalProfile", back_populates="user", uselist=False)
    bookings = relationship("Booking", back_populates="customer")

class CustomerProfile(Base):
    __tablename__ = "customer_profiles"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    default_address = Column(Text, nullable=True)
    city = Column(String(50), default="Hyderabad")
    wallet_balance = Column(Float, default=100.0)

    user = relationship("User", back_populates="customer_profile")

class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True)
    category_id = Column(String, nullable=False)
    business_name = Column(String(150), nullable=True)
    experience_years = Column(Integer, default=1)
    visit_charge = Column(Float, default=199.0)
    rating = Column(Float, default=5.0)
    review_count = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    is_online = Column(Boolean, default=True)
    service_radius_km = Column(Float, default=15.0)

    user = relationship("User", back_populates="provider_profile")
    bookings = relationship("Booking", back_populates="professional")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, index=True)
    customer_id = Column(String, ForeignKey("users.id"), nullable=False)
    professional_id = Column(String, ForeignKey("professional_profiles.id"), nullable=False)
    service_category = Column(String(50), nullable=False)
    booking_date = Column(String(50), nullable=False)
    time_slot = Column(String(50), nullable=False)
    problem_description = Column(Text, nullable=True)
    status = Column(String(30), default="requested")  # requested, assigned, on_the_way, arriving, in_progress, completed, cancelled
    total_amount = Column(Float, nullable=False)
    payment_status = Column(String(30), default="pending")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    customer = relationship("User", back_populates="bookings")
    professional = relationship("ProfessionalProfile", back_populates="bookings")
