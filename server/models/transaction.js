const db = require('../db');

module.exports = {
  create: ({ type, securityId, shares, price, portfolioId }) => {
    const queryString = `
      INSERT INTO stock_txs (type, security_id, units, price, portfolio_id)
      VALUES (?, ?, ?, ?, ?)`;
    const queryParams = [type, securityId, shares, price, portfolioId];
    return db.query(queryString, queryParams);
  },
};
