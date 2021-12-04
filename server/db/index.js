const mysql = require('promise-mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'stocks',
  connectionLimit: 10,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
