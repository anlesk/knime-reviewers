const express = require('express');
const router = express.Router();
const runKnime = require('../../services/knime');

router.get('/articles', async function (req, res) {
  const { firstName, lastName } = req.query;

  const results = await runKnime({ firstName, lastName });

  res.send(results);
});

module.exports = router;