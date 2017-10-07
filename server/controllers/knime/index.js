const express = require('express');
const router = express.Router();

router.get('/reviewers', function (req, res) {
  const { reviewer, journal } = req.query;

  res.send([`${journal}/${reviewer}`]);
});

module.exports = router;