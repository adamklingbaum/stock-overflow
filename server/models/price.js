const db = require('../db');

module.exports = {
  get: (securityId, date) => {
    const queryString = 'SELECT * FROM prices WHERE security_id=? AND date=?';
    const queryParams = [securityId, date];
    return db.query(queryString, queryParams);
  },
  add: (securityId, date, price) => {
    const queryString =
      'INSERT INTO prices (security_id, date, price) VALUES (?, ?, ?)';
    const queryParams = [securityId, date, price];
    return db.query(queryString, queryParams);
  },
};
