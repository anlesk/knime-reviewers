const fs = require('fs');
const path = require('path');
const { pathToProcessesDir } = require('../../constants');

const readDir = () => {
  const getBirthTime = (name) => fs.statSync(pathToProcessesDir + path.sep + name).birthtimeMs;

  const filesInDir = fs.readdirSync(pathToProcessesDir)
    .map(name => ({
      name,
      date: getBirthTime(name),
    }));

  return filesInDir;
};

module.exports = readDir;