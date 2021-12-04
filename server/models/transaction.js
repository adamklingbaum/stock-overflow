const db = require('../db');

module.exports = {
  create: ({ type, securityId, shares, price, portfolioId }) => {
    const queryString = `
      INSERT INTO stock_txs (type, security_id, units, price, portfolio_id)
      VALUES (?, ?, ?, ?, ?)`;
    const queryParams = [type, securityId, shares, price, portfolioId];
    return db.query(queryString, queryParams);
  },
  getAllByPortfolio: (portfolioId) => {
    const queryString = `
      SELECT
        stock_txs.id as id,
        stock_txs.date as date,
        stock_txs.type as type,
        stock_txs.units as units,
        stock_txs.price as price,
        securities.id as securityId,
        securities.name as name,
        securities.symbol as symbol
      FROM stock_txs JOIN securities
      ON stock_txs.security_id=securities.id
      WHERE portfolio_id=?`;
    const queryParams = [portfolioId];
    return db.query(queryString, queryParams);
  },
};
