const { security } = require('../models');

module.exports = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await security.getAll();
      res.status(200).send(rows);
    } catch (e) {
      console.error(e);
      res.status(500).send();
    }
  },
};
