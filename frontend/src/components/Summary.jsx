import { useState } from "react";
import API from "../api";

function Summary() {
  const [userId, setUserId] = useState("");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      setError("");

      const res = await API.get(
        `/summary/${userId}`
      );

      setSummary(res.data);
    } catch (err) {
      setSummary(null);

      setError(
        err.response?.data?.detail ||
          "User not found"
      );
    }
  };

  return (
    <div className="card">
      <h2>User Summary</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
      />

      <button onClick={fetchSummary}>
        Get Summary
      </button>

      {error && (
        <p>{error}</p>
      )}

      {summary && (
        <div>
          <p>
            <strong>User:</strong>{" "}
            {summary.userId}
          </p>

          <p>
            <strong>Total Amount:</strong>{" "}
            {summary.totalAmount}
          </p>

          <p>
            <strong>
              Transactions:
            </strong>{" "}
            {summary.totalTransactions}
          </p>

          <p>
            <strong>Score:</strong>{" "}
            {summary.score}
          </p>
        </div>
      )}
    </div>
  );
}

export default Summary;