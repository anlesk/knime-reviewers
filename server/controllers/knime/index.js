const express = require('express');
const router = express.Router();
const { runKnimeJob, getProcesses } = require('../../services/knime');
const readCVSFile = require('../../services/knime/fileReader');

router.post('/articles', async function (req, res) {
  try {
    const results = runKnimeJob(req.body);

    res.send(results);
  } catch (e) {
    const { code, message } = e;
    res.status(code).send({ message });
  }
});

router.get('/process', async function (req, res) {
  try {
    const results = getProcesses();

    res.send(results);
  } catch (e) {
    const { code, message } = e;
    res.status(code).send({ message });
  }
});

router.get('/result', async function (req, res) {
  const { id } = req.query;

  try {
    const results = readCVSFile({ id });

    res.send(results);
  } catch (e) {
    const { code, message } = e;
    res.status(code).send({ message });
  }
});

module.exports = router;