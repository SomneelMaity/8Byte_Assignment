import { useEffect, useState } from 'react';
import PortfolioTable from './components/PortfolioTable';
import './App.css';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [marketData, setMarketData] = useState([]);

  const fetchPortfolio = async () => {
    const res = await fetch('http://localhost:5000/api/portfolio');
    const data = await res.json();
    setPortfolio(data);
  };

  const fetchMarketData = async (symbols) => {
    const res = await fetch(`http://localhost:5000/api/marketdata?symbols=${symbols.join(',')}`);
    const data = await res.json();
    setMarketData(data);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (portfolio.length > 0) {
      const symbols = portfolio.map(p => p.particulars);
      fetchMarketData(symbols);
      const interval = setInterval(() => fetchMarketData(symbols), 15000);
      return () => clearInterval(interval);
    }
  }, [portfolio]);

  const totalInvestment = portfolio.reduce((a, b) => a + (b.purchasePrice * b.qty), 0);

  const combinedData = portfolio.map(stock => {
    const market = marketData.find(m => m.symbol === stock.particulars) || {};
    const investment = stock.purchasePrice * stock.qty;
    const presentValue = (market.cmp || 0) * stock.qty;
    const gainLoss = presentValue - investment;
    const portfolioPct = ((investment / totalInvestment) * 100).toFixed(2);

    return {
      ...stock,
      investment,
      portfolioPct,
      cmp: Number(market.cmp) || 0,
      presentValue,
      gainLoss,
      peRatio: market.peRatio || '-',
      latestEarnings: market.latestEarnings || '-'
    };
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="title">Portfolio Dashboard</h1>
      <PortfolioTable data={combinedData} />
    </div>
  );
}

export default App;
