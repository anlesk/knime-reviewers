const express = require('express');
const router = express.Router();
const runKnime = require('../../services/knime');
const results = require('../../../example/result');

router.get('/articles', function (req, res) {
  const { firstName, lastName } = req.query;

  // runKnime();

  res.send(results);
});

module.exports = router;