import { useEffect, useState } from "react";
import API from "../api";

function Ranking() {
  const [ranking, setRanking] = useState([]);

  const fetchRanking = async () => {
    try {
      const res = await API.get(
        "/ranking"
      );

      setRanking(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <div className="card">
      <h2>Leaderboard</h2>

      <button onClick={fetchRanking}>
        Refresh Ranking
      </button>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map((user) => (
            <tr key={user.userId}>
              <td>{user.rank}</td>
              <td>{user.userId}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;