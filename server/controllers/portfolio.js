const { portfolio, transaction } = require('../models');
const axios = require('axios');
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const { API_KEY } = require('../finnhub.config');

const getHoldings = async (portfolioId) => {
  try {
    const [rows, fields] = await transaction.getAllByPortfolio(portfolioId);
    let holdings = {};
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

    holdings = Object.keys(holdings).map(
      (key) =>
        new Promise((resolve, reject) => {
          const holding = holdings[key];
          axios
            .get(`${FINNHUB_BASE_URL}/quote?symbol=${holding.symbol}`, {
              headers: { 'X-FinnHub-Token': API_KEY },
            })
            .then(({ data }) => {
              holding.price = data.c;
              holding.oneDay = data.dp / 100;
              holding.mktVal = holding.price * holding.shares;
              holding.avgCost =
                holding.totalPurchaseCost / holding.totalPurchaseUnits;
              holding.totalCost = holding.avgCost * holding.shares;
              holding.unrealizedGain = holding.mktVal - holding.totalCost;
              holding.unrealizedPercent =
                holding.unrealizedGain / holding.totalCost;
              resolve(holding);
            });
        }),
    );
    return Promise.all(holdings);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

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
      const holdings = await getHoldings(portfolioId);
      res.status(200).send(holdings);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
  getSummary: async (req, res) => {
    const { portfolio_id: portfolioId } = req.params;
    try {
      const holdings = await getHoldings(portfolioId);
      const portfolioSummary = {};
      portfolioSummary.numHoldings = holdings.length;
      portfolioSummary.top3Holdings = holdings
        .sort((a, b) => b.mktVal - a.mktVal)
        .slice(0, 3);
      portfolioSummary.bookCost = holdings.reduce(
        (prev, curr) => prev + curr.totalCost,
        0,
      );

      // Calculate cash
      let [rows, fields] = await portfolio.getStartingCash(portfolioId);
      const startingCash = rows[0]['starting_cash'];
      [rows, fields] = await transaction.getAllByPortfolio(portfolioId);
      portfolioSummary.cash = rows.reduce((prev, tx) => {
        if (tx.type === 'sell') return prev + tx.units * tx.price;
        else return prev - tx.units * tx.price;
      }, startingCash);

      // Calculate investments
      portfolioSummary.investments = holdings.reduce(
        (prev, holding) => prev + holding.mktVal,
        0,
      );

      // Calculate market value
      portfolioSummary.totalMktVal =
        portfolioSummary.cash + portfolioSummary.investments;

      // Calculate return since inception
      portfolioSummary.returnSinceInception =
        portfolioSummary.totalMktVal - startingCash;

      // Calculate percent since inception
      portfolioSummary.percentSinceInception =
        portfolioSummary.returnSinceInception / startingCash;

      // Calculate unrealizedGains
      portfolioSummary.unrealizedGains =
        portfolioSummary.investments - portfolioSummary.bookCost;
      res.status(200).send(portfolioSummary);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
};
