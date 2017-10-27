const fs = require('fs');

const DIR_PATH = './example/';

const readDir = () => {
  const filesInDir = fs.readdirSync(DIR_PATH);

  return filesInDir;
};

module.exports = readDir;