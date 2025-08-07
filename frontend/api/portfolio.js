import portfolioData from '../../backend/data/portfolio.json';

export default function handler(req, res) {
  res.status(200).json(portfolioData);
}
