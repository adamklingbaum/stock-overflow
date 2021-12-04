const express = require('express');
const { portfolio, security, transaction } = require('./controllers');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/sports', (req, res) => {
  console.log('big');
  res.status(200).send('big');
});

app.get('/securities', security.getAll);

app.post('/portfolios', portfolio.create);

app.post('/transactions', transaction.create);

module.exports = app;
