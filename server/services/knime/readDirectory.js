const fs = require('fs');
const path = require('path');

const settings = require('../../settings');

const readDir = () => {
  const pathToProcessesDir = settings.getItem('knimeResultsPath');
  const getBirthTime = (name) => fs.statSync(`${pathToProcessesDir}${path.sep}${name}`).birthtimeMs;

  const filesInDir = fs.readdirSync(pathToProcessesDir)
    .map(name => ({
      name,
      date: getBirthTime(name),
    }));

  return filesInDir;
};

module.exports = readDir;