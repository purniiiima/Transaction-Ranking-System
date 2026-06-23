from pydantic import BaseModel, Field


class TransactionCreate(BaseModel):
    requestId: str = Field(..., min_length=3)
    userId: str = Field(..., min_length=1)
    amount: float = Field(..., gt=0, le=100000)


class TransactionResponse(BaseModel):
    message: str


class SummaryResponse(BaseModel):
    userId: str
    totalTransactions: int
    totalAmount: float
    score: float