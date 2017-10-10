const fs = require('fs');

const FILEPATH = './example/params.json';

const writeParametersToFile = (params) => fs.writeFileSync(FILEPATH, JSON.stringify(params));

module.exports = writeParametersToFile;