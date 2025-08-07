import React, { useEffect, useState } from 'react';
import PortfolioTable from './components/PortfolioTable';
import './App.css';

function App() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch('/portfolio.json')
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error("Failed to load portfolio:", err));
  }, []);

  return (
    <div className="App">
      <h1 className="heading">Portfolio Dashboard</h1>
      <PortfolioTable data={portfolio} />
    </div>
  );
}

export default App;
