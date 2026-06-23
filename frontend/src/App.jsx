import TransactionForm from "./components/TransactionForm";
import Summary from "./components/Summary";
import Ranking from "./components/Ranking";

function App() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>
        Transaction Ranking System
      </h1>

      <TransactionForm />

      <Summary />

      <Ranking />
    </div>
  );
}

export default App;