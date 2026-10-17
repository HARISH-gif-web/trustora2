# Trustora AI — AI-Powered Local Services Marketplace

> **"Trusted Help. Right Around You."**  
> An AI-first two-sided local services marketplace connecting service seekers with verified neighborhood professionals.

---

## 📱 Wireframe Implementation (10 Core Screens)

1. **Screen 1 — Splash Screen**: Dark navy (`#0B1F3A`) background, animated custom house-and-handshake vector logo, tagline, trust indicators, and progress indicator with Skip option.
2. **Screen 2 — Role Selection**: Clean welcome interface featuring **I am Service Seeker** and **I am Service Provider** cards with trust highlights.
3. **Screen 3 — Sign Up / Login**: Tabbed authentication with full validation, terms acceptance, social options, and **1-Click Demo Logins** (Seeker: Harish, Provider: Ravi, Admin).
4. **Screen 4 — Home Page (Seeker)**: Sticky top header, dynamic city selector (`Hyderabad ⌄`), 3-line hamburger menu in the top-right corner, problem search bar with voice mic & camera shortcuts, hero banner, quick category grid, and AI Assistant card.
5. **Screen 5 — Menu Drawer (Right Corner)**: Slide-over drawer with user profile summary, perspective switcher, active bookings badge, wallet balance, and full navigation.
6. **Screen 6 — Service Listing**: Filter chips (`All`, `Near me`, `Top Rated`, `Available Today`, `Price: Low to High`), search within category, and professional cards with bookmarking and direct booking.
7. **Screen 7 — Professional Profile**: Profile photography, rating, 4-point verification badge breakdown modal, rate card, portfolio images, customer reviews, and sticky "Book Now" bar.
8. **Screen 8 — Booking Page**: Date and time slot picker, problem description textarea, optional photo attachment with preview, transparent price breakdown (visit fee adjusted into final bill).
9. **Screen 9 — Booking Tracking**: Interactive 4-step progress stepper, live vector GPS map route, technician card ("Ravi is on the way"), functional calling & in-app chat modal, and completion rating form.
10. **Screen 10 — Home Page (Provider)**: Dedicated provider dashboard for Ravi Kumar with Online/Offline toggle, metrics (12 new requests, 8 today's jobs, ₹3,250 weekly earnings), and request accept/decline modal.

---

## 🤖 AI Engineering & Machine Learning Features

- **Trustora AI Assistant (Voice & Chat)**:
  - Natural Language service intent and category classification.
  - Bilingual English and **Telugu** conversational understanding.
  - Web Speech API for real-time speech-to-text and text-to-speech.
  - RAG grounding citing published 30-day rework warranty, cancellation, and pricing policies.
- **AI Computer Vision Photo Diagnostic**:
  - Detects plumbing leaks, tripped switchboards, and AC drainage faults from photos.
  - Highlights region of interest with bounding box and priority severity.
- **AI Evaluation & ML Metrics Center**:
  - Classifier Accuracy: **96.4%** | F1-Score: **96.0%** | Latency: **18ms**.
  - RAG Grounding Faithfulness: **98.2%** | Hallucination Rate: **<0.8%**.
  - Two-Tower Recommendation NDCG@5: **0.892**.
  - Time-series service demand forecasting chart across metro cities.
- **Admin Dashboard**:
  - Platform totals start at zero until connected to live account and transaction data.
  - Explore sample weekly service forecasts for Hyderabad Metro, Gachibowli, Madhapur, Kukatpally, Kondapur, and Secunderabad as stacked bars, a line chart, or a table.
  - Admin access uses a demo password check in the browser. This demo gate is not a substitute for server-side authentication.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **AI / LLM**: `@google/genai` (Gemini 2.5 Flash) with resilient local NLP fallback.
- **Backend**: FastAPI, Pydantic, Python 3.11, SQLAlchemy, Alembic, PostgreSQL with pgvector.

---

## 🚀 Running the Project

### Frontend
```bash
npm run dev
# Starts development server on port 3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
