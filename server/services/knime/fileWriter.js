const json2csv = require('json2csv');
const fs = require('fs');

const FILEPATH = './example/params.csv';

const writeParametersToFile = data => fs.writeFileSync(FILEPATH, json2csv({ data, fields: [ 'firstName', 'lastName' ] }));

module.exports = writeParametersToFile;