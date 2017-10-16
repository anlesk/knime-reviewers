const parse = require('csv-parse/lib/sync');
const fs = require('fs');

const FILEPATH = './example/result.csv';

const readCVSFile = () => {
  const csvFileString = fs.readFileSync(FILEPATH).toString();
  const result = parse(csvFileString, { columns: true });

  return result;
};

module.exports = readCVSFile;