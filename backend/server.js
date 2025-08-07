const express = require('express');
const cors = require('cors');
const portfolioData = require('./data/portfolio.json');

const app = express();
app.use(cors());

// API to return portfolio
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

// API to return mock market data
app.get('/api/marketdata', (req, res) => {
  const { symbols } = req.query;
  const symbolList = symbols ? symbols.split(',') : [];

  const mockData = symbolList.map(symbol => ({
    symbol,
    cmp: (Math.random() * 500 + 1000).toFixed(2), // Random CMP
    peRatio: (Math.random() * 20 + 10).toFixed(2), // Random PE
    latestEarnings: `${(Math.random() * 100).toFixed(2)} Cr`
  }));

  res.json(mockData);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
