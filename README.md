# Transaction Ranking System

A full-stack application built with **FastAPI**, **SQLite**, and **React** that allows users to create transactions, view transaction summaries, and view a ranked leaderboard based on multiple scoring factors.

---

## Features

- Create transactions through API and UI
- Request validation using Pydantic
- Duplicate request prevention using unique request IDs
- User transaction summary
- Dynamic ranking system
- Fair scoring algorithm based on multiple factors
- Concurrency-safe transaction processing
- Responsive React frontend
- FastAPI Swagger documentation

---

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- React
- Vite
- Axios
- CSS3

---

## Project Structure

```text
transaction-ranking-system
│
├── README.md
│
├── backend
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── ranking.py
│   ├── requirements.txt
│   └── README.md
│
└── frontend
    ├── src
    │   ├── components
    │   │   ├── TransactionForm.jsx
    │   │   ├── Summary.jsx
    │   │   └── Ranking.jsx
    │   │
    │   ├── api.js
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/purniiiima/Transaction-Ranking-System.git
cd transaction-ranking-system
```

---

## Backend Setup

```bash
cd backend

python3 -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

Open a new terminal:

```bash
cd frontend

npm install

npm install axios
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

## Create Transaction

### POST /transaction

Request:

```json
{
  "requestId": "txn1",
  "userId": "user1",
  "amount": 500
}
```

Response:

```json
{
  "message": "Transaction created successfully"
}
```

---

## User Summary

### GET /summary/{userId}

Example:

```http
GET /summary/user1
```

Response:

```json
{
  "userId": "user1",
  "totalTransactions": 2,
  "totalAmount": 1000,
  "score": 1050
}
```

---

## Ranking

### GET /ranking

Response:

```json
[
  {
    "rank": 1,
    "userId": "user1",
    "score": 2500
  }
]
```

---

# Ranking Calculation

The ranking algorithm is based on multiple factors to ensure fairness.

```text
Score =
Total Amount
+ (Total Transactions × 20)
+ Consistency Bonus
```

Consistency Bonus:

```text
min(Total Transactions × 5, 100)
```

### Example

```text
User A:
Amount = 5000
Transactions = 1

Score = 5025
```

```text
User B:
Amount = 4500
Transactions = 10

Score = 4750
```

This approach rewards both contribution amount and consistent activity.

---

# Duplicate Request Prevention

Each transaction requires a unique:

```text
requestId
```

The backend stores:

```text
request_id UNIQUE
```

If the same request is submitted again:

```http
409 Conflict
```

is returned.

This ensures the same transaction cannot be processed multiple times.

---

# ⚡ Concurrency Handling

To handle simultaneous requests safely:

- Unique database constraint on request_id
- Database transactions using SQLAlchemy
- IntegrityError handling
- Atomic database commits

This guarantees that duplicate concurrent requests cannot create duplicate records.

---

# Validation & Abuse Prevention

The system validates:

### User ID

- Required
- Cannot be empty

### Request ID

- Required
- Must be unique

### Amount

- Greater than 0
- Maximum allowed amount: 100000

Invalid requests return proper error responses.

---

# 🎥 Video Demonstration

The video demonstrates:

- Application overview
- Transaction creation
- Duplicate request prevention
- Summary endpoint
- Ranking system
- Concurrency handling explanation
- Trade-offs and limitations

---

# Deployment

## Backend

Deployed using Render.

## Frontend

Deployed using Vercel.

---

# Author

**Purnima Baroi**

Full Stack Developer

LinkedIn:
https://www.linkedin.com/in/purnima-baroi/