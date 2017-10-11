const json2csv = require('json2csv');
const fs = require('fs');

const FILEPATH = './example/params.json';

const writeParametersToFile = (params) => fs.writeFileSync(FILEPATH, json2csv(params));

module.exports = writeParametersToFile;