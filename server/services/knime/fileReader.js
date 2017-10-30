const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

const DIR_PATH = './example/';

const readCVSFile = ({ id }) => {
  const csvFileString = fs.readFileSync(DIR_PATH + path.sep + id).toString();
  const result = parse(csvFileString, { columns: true });

  return result;
};

module.exports = readCVSFile;