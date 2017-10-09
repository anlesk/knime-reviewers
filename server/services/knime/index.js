const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

let isLocked = false;

const lock = () => {
  if (isLocked) throw new Error('Another job is in progress!');

  isLocked = true;
};
const unlock = () => isLocked = false;

const runKnimeJob = async () => {
  lock();

  const { stdout, error } = await execFile('node', ['--version']);

  if (error) {
    throw error;
  }
  console.log(stdout);

  unlock();
};

module.exports = runKnimeJob;