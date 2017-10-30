const fs = require('fs');
const path = require('path');

const DIR_PATH = './example/';
const getBirthTime = name => fs.statSync(DIR_PATH + path.sep + name).birthtimeMs;

const readDir = () => {
  const filesInDir = fs.readdirSync(DIR_PATH)
    .map(name => ({
      name,
      date: getBirthTime(name),
    }));

  return filesInDir;
};

module.exports = readDir;