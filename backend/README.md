# Transaction Ranking System

## Setup

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn main:app --reload
```

Server:

http://localhost:8000

---

## APIs

### POST /transaction

Request:

```json
{
  "requestId":"txn1",
  "userId":"user1",
  "amount":500
}
```

Response:

```json
{
  "message":"Transaction created successfully"
}
```

---

### GET /summary/{userId}

Example:

```bash
GET /summary/user1
```

Response:

```json
{
  "userId":"user1",
  "totalTransactions":2,
  "totalAmount":1000,
  "score":1050
}
```

---

### GET /ranking

Returns all users ranked by score.

---

## Ranking Formula

score =

total_amount

+ (total_transactions × 20)

+ consistency_bonus

where:

consistency_bonus = min(
total_transactions × 5,
100
)

---

## Duplicate Prevention

request_id is unique.

Duplicate requestIds return:

409 Conflict

---

## Concurrency Handling

Database transactions and unique request_id constraints ensure duplicate simultaneous requests cannot be processed more than once.