const db = require('../db');

module.exports = {
  create: ({ name, date, cash }) => {
    const queryString = `
      INSERT INTO portfolios (name, inception_date, starting_cash)
      VALUES (?, ?, ?)`;
    const queryParams = [name, date, cash];
    return db.query(queryString, queryParams);
  },
  get: (portfolioId) => {
    const queryString = `SELECT * FROM portfolios WHERE id=?`;
    const queryParams = [portfolioId];
    return db.query(queryString, queryParams);
  },
  getStartingCash: (portfolioId) => {
    const queryString = `SELECT starting_cash FROM portfolios WHERE id=?`;
    const queryParams = [portfolioId];
    return db.query(queryString, queryParams);
  },
};
