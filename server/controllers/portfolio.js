const { portfolio, transaction } = require('../models');

module.exports = {
  create: async (req, res) => {
    const { name, date, cash } = req.body;
    console.log(name, date, cash);
    try {
      const [rows] = await portfolio.create({ name, date, cash });
      res.status(201).json({ created_id: rows.insertId });
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
  getHoldings: async (req, res) => {
    const { portfolio_id: portfolioId } = req.params;
    try {
      const [rows, fields] = await transaction.getAllByPortfolio(portfolioId);
      console.log(rows);
      const holdings = {};
      rows.forEach(
        ({ id, date, type, units, price, securityId, name, symbol }) => {
          if (!(securityId in holdings)) {
            holdings[securityId] = {
              securityId,
              name,
              symbol,
              shares: 0,
              totalPurchaseCost: 0,
              totalPurchaseUnits: 0,
              trades: 0,
            };
          }
          const holding = holdings[securityId];
          holding.shares += type === 'buy' ? units : units * -1;
          holding.totalPurchaseCost += type === 'buy' && units * price;
          holding.totalPurchaseUnits += type === 'buy' && units;
          holding.trades += 1;
        },
      );
      Object.keys(holdings).forEach((key) => {
        const holding = holdings[key];
        holding.price = 504.23;
        holding.oneDay = 0.1234;
        holding.mktVal = holding.price * holding.shares;
        holding.avgCost =
          holding.totalPurchaseCost / holding.totalPurchaseUnits;
        holding.totalCost = holding.avgCost * holding.shares;
        holding.unrealizedGain = holding.mktVal - holding.totalCost;
        holding.unrealizedPercent = holding.unrealizedGain / holding.totalCost;
      });
      res.status(200).send(holdings);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
};

/* {
  securityId: 1,
  name: 'Microsoft Corporation',
  symbol: 'MSFT',
  price: 102.5,
  shares: 100,
  mktVal: 10250,
  avgCost: 92.5,
  totalCost: 9250,
  unrealizedGain: 1000,
  unrealizedPercent: 0.1081,
  trades: 2,
  oneDay: 0.1256,
},
{
  securityId: 2,
  name: 'Tesla, Inc.',
  symbol: 'TSLA',
  price: 102.5,
  shares: 100,
  mktVal: 10250,
  avgCost: 92.5,
  totalCost: 9250,
  unrealizedGain: 1000,
  unrealizedPercent: 0.1081,
  trades: 2,
  oneDay: 0.1256,
},
{
  securityId: 3,
  name: 'Apple Inc.',
  symbol: 'AAPL',
  price: 102.5,
  shares: 100,
  mktVal: 10250,
  avgCost: 92.5,
  totalCost: 9250,
  unrealizedGain: 1000,
  unrealizedPercent: 0.1081,
  trades: 2,
  oneDay: 0.1256,
}, */
