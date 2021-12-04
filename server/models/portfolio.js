const db = require('../db');

module.exports = {
  create: ({ name, date, cash }) => {
    const queryString = `
      INSERT INTO portfolios (name, inception_date, starting_cash)
      VALUES (?, ?, ?)`;
    const queryParams = [name, date, cash];
    return db.query(queryString, queryParams);
  },
};
