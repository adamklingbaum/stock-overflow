const db = require('../db');

module.exports = {
  getAll: () => {
    const queryString = 'SELECT * FROM securities';
    return db.query(queryString);
  },
  getBySymbol: (symbol) => {
    const queryString = 'SELECT * FROM securities WHERE symbol=?';
    const queryParams = [symbol];
    return db.query(queryString, queryParams);
  },
};
