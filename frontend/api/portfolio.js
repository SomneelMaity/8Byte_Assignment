import portfolioData from '../portfolio.json';

export default function handler(req, res) {
  res.status(200).json(portfolioData);
}
