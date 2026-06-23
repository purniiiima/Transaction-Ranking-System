import { useState } from "react";
import API from "../api";

function TransactionForm() {
  const [requestId, setRequestId] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/transaction", {
        requestId,
        userId,
        amount: Number(amount),
      });

      setMessage(res.data.message);

      setRequestId("");
      setUserId("");
      setAmount("");
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="card">
      <h2>Create Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Request ID"
          value={requestId}
          onChange={(e) =>
            setRequestId(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          required
        />

        <button type="submit">
          Submit
        </button>
      </form>

      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}

export default TransactionForm;