const express = require('express');
const router = express.Router();
const runKnime = require('../../services/knime');

router.get('/articles', async function (req, res) {
  const { firstName, lastName } = req.query;

  try {
    const results = await runKnime({ firstName, lastName });

    res.send(results);
  } catch (e) {
    const { code, message } = e;
    res.status(code).send({ message });
  }

});

module.exports = router;