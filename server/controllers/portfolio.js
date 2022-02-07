const { portfolio, transaction, price, security } = require('../models');
const axios = require('axios');
const IEX_BASE_URL = 'https://cloud.iexapis.com/stable';
const { IEX_API_KEY } = require('../iex.config');

const getPrice = async (securityId, date) => {
  const dateStr = date.toISOString().split('T')[0];
  try {
    let [rows, fields] = await price.get(securityId, dateStr);
    const apiDateStr = dateStr.split('-').join('');
    if (rows.length === 0) {
      [rows, fields] = await security.getSymbolById(securityId);
      const symbol = rows[0].symbol;
      return axios
        .get(`${IEX_BASE_URL}/stock/${symbol}/chart/date/${apiDateStr}`, {
          params: {
            token: IEX_API_KEY,
            chartByDay: true,
            chartCloseOnly: true,
          },
        })
        .then(({ data }) => {
          if (data.length === 0) {
            let yesterday = new Date(date.getTime() - 1000 * 60 * 60 * 24);
            return getPrice(securityId, yesterday);
          }
          const { close } = data[0];
          price.add(securityId, date, close);
          return close;
        });
    } else {
      return rows[0].price;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getHoldings = async (portfolioId, date = new Date()) => {
  const dateStr = date.toISOString().split('T')[0];
  try {
    const [rows, fields] = await transaction.getAllByPortfolio(
      portfolioId,
      dateStr,
    );
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
      (id) =>
        new Promise((resolve, reject) => {
          const holding = holdings[id];
          getPrice(id, date).then((price) => {
            holding.price = price;
            holding.oneDay = Math.random() * (0.03 + 0.03) - 0.03;
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

const getSummary = async (portfolioId, date = new Date()) => {
  const dateStr = date.toISOString().split('T')[0];
  try {
    const holdings = await getHoldings(portfolioId, date);
    const portfolioSummary = {};
    portfolioSummary.numHoldings = holdings.length;
    portfolioSummary.top3Holdings = holdings
      .sort((a, b) => b.mktVal - a.mktVal)
      .slice(0, 3);
    portfolioSummary.bookCost = holdings.reduce(
      (prev, curr) => prev + curr.totalCost,
      0,
    );

    let [rows, fields] = await portfolio.getStartingCash(portfolioId);
    const startingCash = rows[0]['starting_cash'];
    [rows, fields] = await transaction.getAllByPortfolio(portfolioId, dateStr);
    portfolioSummary.cash = rows.reduce((prev, tx) => {
      if (tx.type === 'sell') return prev + tx.units * tx.price;
      else return prev - tx.units * tx.price;
    }, startingCash);

    portfolioSummary.investments = holdings.reduce(
      (prev, holding) => prev + holding.mktVal,
      0,
    );

    portfolioSummary.totalMktVal =
      portfolioSummary.cash + portfolioSummary.investments;

    portfolioSummary.returnSinceInception =
      portfolioSummary.totalMktVal - startingCash;

    portfolioSummary.percentSinceInception =
      portfolioSummary.returnSinceInception / startingCash;

    portfolioSummary.unrealizedGains =
      portfolioSummary.investments - portfolioSummary.bookCost;

    return portfolioSummary;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  get: async (req, res) => {
    const { portfolio_id: id } = req.params;
    try {
      const [rows, fields] = await portfolio.get(id);
      res.status(201).send(rows[0]);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
  create: async (req, res) => {
    const { name, date, cash } = req.body;
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
      const summary = await getSummary(portfolioId);
      res.status(200).send(summary);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
  getDailyValues: async (req, res) => {
    const { portfolio_id: portfolioId } = req.params;
    try {
      let [rows, fields] = await portfolio.get(portfolioId);
      const p = rows[0];
      const { inception_date: inceptionDate, starting_cash: startingCash } = p;

      const today = new Date();
      let start = new Date(inceptionDate);
      let currDate = start;
      let portfolioSummary;
      let currString;
      const series = {};
      while (currDate <= today) {
        currString = currDate.toISOString().split('T')[0];
        series[currString] = { date: currDate };
        portfolioSummary = await getSummary(portfolioId, currDate);
        series[currString].summary = portfolioSummary;
        currDate = new Date(currDate.getTime() + 1000 * 60 * 60 * 24);
      }
      res.status(200).send(series);
    } catch (e) {
      console.error(e);
    }
  },
};
