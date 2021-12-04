const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/sports', (req, res) => {
  console.log('big');
  res.status(200).send('big');
});

module.exports = app;
