import { CoinForm } from "~/components/coin-form";
import { CoinList } from "~/components/coin-list";
import { PortfolioValue } from "~/components/portfolio-value";

function App() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold bg-card p-4">Portfolio</h1>
      <div className="p-4">
        <PortfolioValue />
        <CoinList />
        <CoinForm />
      </div>
    </div>
  );
}

export default App
