const express = require('express');
const router = express.Router();
const runKnime = require('../../services/knime');

router.get('/articles', async function (req, res) {
  const { firstName, lastName } = req.query;

  try {
    const results = await runKnime({ firstName, lastName });

    res.send(results);
  } catch (e) {
    console.log("error", e);

    if (e.code === 423) res.sendStatus(423);
  }

});

module.exports = router;