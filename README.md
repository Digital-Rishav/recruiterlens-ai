# RecruiterLens AI 🔍

An AI-powered candidate-job compatibility analyzer built as a production-grade one-night MVP. A recruiter or hiring manager provides a resume and a job description; RecruiterLens AI leverages Google Gemini 2.5 Flash through a Spring Boot backend to extract structured compatibility insights.

![Tech Stack](https://img.shields.io/badge/Backend-Java%2021%20%7C%20Spring%20Boot%203.4-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20TailwindCSS-blue)
![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)

---

## 🌟 Features

- **Match Score (0-100)**: Visual circular gauge displaying candidate-to-role suitability.
- **Matched & Missing Skills**: Instant categorization of overlapping vs unverified skills.
- **Experience & Seniority Gaps**: Highlights timeline, tooling, and domain discrepancies.
- **Targeted Interview Questions**: AI-generated questions to probe identified gaps during technical rounds, with 1-click clipboard copying.
- **Actionable Recommendations**: Next steps for hiring managers and candidate development.
- **Shortlist Recommendation & Reason**: Clear hiring verdicts (`SHORTLIST`, `CONSIDER`, `REJECT`) with executive reasoning.
- **1-Click Demo Presets**: Test instantly with preloaded profiles (Senior Java Lead, Mid Backend, and Mismatched Profile).
- **Graceful Error Handling**: Helpful troubleshooting alerts and configuration guidance.

---

## 🏗️ Architecture

```
[ React + Vite Dashboard (:5173) ]
           │
           │ HTTP REST (JSON)
           ▼
[ AnalysisController (:8080) ]
           │
           ▼
[ AnalysisService ]
           │
           ▼
[ AiAnalysisClient Interface ]
           │
           ▼
[ GeminiAiClient (Spring RestClient) ]
           │
           ▼
[ Google Gemini 2.5 Flash API ]
```

- **Separation of Concerns**: Strict `Controller → Service → AI Client Abstraction` architecture.
- **Security**: The Gemini API key is never exposed to the frontend and is read from server environment variables.
- **Structured Output**: Enforces strict JSON schemas using Gemini's native structured JSON mode (`responseMimeType: "application/json"`).
- **CORS Configured**: Pre-configured to allow requests from the React dev server (`http://localhost:5173`).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Java 21** or later
- **Node.js 18+** and **npm**
- **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

---

### 2. Backend Setup

Open a terminal in `backend/`:

#### Option A: Running with Live Gemini API Key
```bash
# Windows PowerShell:
$env:GEMINI_API_KEY = "your-actual-gemini-api-key"
./mvnw spring-boot:run

# Linux / macOS:
export GEMINI_API_KEY="your-actual-gemini-api-key"
./mvnw spring-boot:run
```

#### Option B: Running with Mock Mode (Instant Testing without API Key)
```bash
# Windows PowerShell:
$env:GEMINI_MOCK_MODE = "true"
./mvnw spring-boot:run

# Linux / macOS:
export GEMINI_MOCK_MODE="true"
./mvnw spring-boot:run
```

The backend server starts on **`http://localhost:8080`**.

#### Verify Backend Health:
```bash
curl http://localhost:8080/api/health
```

Expected output:
```json
{
  "status": "UP",
  "timestamp": "2026-09-07T15:45:00Z",
  "service": "RecruiterLens AI Backend",
  "geminiConfigured": true
}
```

---

### 3. Frontend Setup

Open another terminal in `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

The frontend dashboard will be live at **`http://localhost:5173`**.

---

## 📡 API Contract

### `GET /api/health`
Checks backend readiness and AI client configuration.

### `POST /api/analyze`

**Request Body:**
```json
{
  "resume": "Experienced Java developer with 5 years Spring Boot...",
  "jobDescription": "Looking for Senior Java Developer with Spring Boot and AWS..."
}
```

**Response (200 OK):**
```json
{
  "matchScore": 85,
  "matchedSkills": ["Java", "Spring Boot", "REST APIs"],
  "missingSkills": ["Kubernetes", "Kafka"],
  "experienceGaps": ["No demonstrated Kubernetes production experience."],
  "interviewQuestions": [
    "How have you designed distributed transactions in Spring Boot?"
  ],
  "recommendations": [
    "Strong core Java fit; probe cloud deployment depth during interview."
  ],
  "shortlistRecommendation": "SHORTLIST",
  "shortlistReason": "Strong alignment with core backend stack."
}
```

---

## 🧪 Running Tests

### Backend Unit & Integration Tests
```bash
cd backend
./mvnw test
```

Includes tests for:
- Input validation (blank fields rejected with 400 Bad Request)
- Health check endpoint verification
- End-to-end response mapping and DTO serialization
