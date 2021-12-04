const { portfolio } = require('../models');

module.exports = {
  create: async (req, res) => {
    const { name, date, cash } = req.body;
    console.log(name, date, cash);
    try {
      const [rows] = await portfolio.create({ name, date, cash });
      res.status(201).json({ created_id: rows.insertId });
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
};
