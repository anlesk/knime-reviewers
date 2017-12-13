const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

const settings = require('../../settings');

const readCVSFile = ({ id }) => {
  const pathToProcessesDir = settings.getItem('knimeResultsPath');
  const csvFileString = fs.readFileSync(`${pathToProcessesDir}${path.sep}${id}`).toString();
  const result = parse(csvFileString, { columns: true });

  return result;
};

module.exports = readCVSFile;