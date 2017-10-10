const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const readCVSFile = require('../../services/knime/fileReader');
const writeParametersToFile = require('../../services/knime/fileWriter');

let isLocked = false;

const lock = () => {
  if (isLocked) throw new Error('Another job is in progress!');

  isLocked = true;
};
const unlock = () => isLocked = false;

const runKnimeJob = async ({ firstName, lastName }) => {
  lock();

  writeParametersToFile({ firstName, lastName });

  const { stdout, error } = await execFile('node', ['--version']);

  if (error) {
    throw error;
  }

  const result = readCVSFile();

  unlock();

  return result;
};

module.exports = runKnimeJob;