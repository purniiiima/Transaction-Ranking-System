from fastapi import FastAPI
from fastapi import Depends
from fastapi import HTTPException

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func

from database import Base
from database import engine
from database import get_db

from models import Transaction

from schemas import (
    TransactionCreate,
    SummaryResponse
)

from ranking import calculate_score

app = FastAPI(
    title="Transaction Ranking System"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "API Running Successfully"
    }


@app.post("/transaction")
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):

    existing = db.query(Transaction).filter(
        Transaction.request_id == transaction.requestId
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Duplicate request"
        )

    new_transaction = Transaction(
        request_id=transaction.requestId,
        user_id=transaction.userId,
        amount=transaction.amount
    )

    try:
        db.add(new_transaction)
        db.commit()
        db.refresh(new_transaction)

        return {
            "message": "Transaction created successfully"
        }

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Duplicate request"
        )


@app.get(
    "/summary/{user_id}",
    response_model=SummaryResponse
)
def get_summary(
    user_id: str,
    db: Session = Depends(get_db)
):

    transactions = db.query(
        Transaction
    ).filter(
        Transaction.user_id == user_id
    ).all()

    if not transactions:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    total_amount = sum(
        t.amount for t in transactions
    )

    total_transactions = len(transactions)

    score = calculate_score(
        total_amount,
        total_transactions
    )

    return {
        "userId": user_id,
        "totalTransactions": total_transactions,
        "totalAmount": total_amount,
        "score": score
    }


@app.get("/ranking")
def get_ranking(
    db: Session = Depends(get_db)
):

    users = db.query(
        Transaction.user_id,
        func.sum(Transaction.amount).label("total_amount"),
        func.count(Transaction.id).label("transaction_count")
    ).group_by(
        Transaction.user_id
    ).all()

    ranking = []

    for user in users:
        score = calculate_score(
            user.total_amount,
            user.transaction_count
        )

        ranking.append({
            "userId": user.user_id,
            "totalAmount": user.total_amount,
            "transactions": user.transaction_count,
            "score": score
        })

    ranking.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    for index, item in enumerate(ranking):
        item["rank"] = index + 1

    return ranking