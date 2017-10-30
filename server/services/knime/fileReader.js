const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');
const { pathToProcessesDir } = require('../../constants');

const readCVSFile = ({ id }) => {
  const csvFileString = fs.readFileSync(pathToProcessesDir + path.sep + id).toString();
  const result = parse(csvFileString, { columns: true });

  return result;
};

module.exports = readCVSFile;