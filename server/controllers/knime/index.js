const express = require('express');
const router = express.Router();
const runKnime = require('../../services/knime');

router.get('/articles', function (req, res) {
  const { firstName, lastName } = req.query;

  runKnime();

  res.send([`${firstName}/${lastName}`]);
});

module.exports = router;