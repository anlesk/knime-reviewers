const spawn = require('child-process-promise').spawn;
const readCVSFile = require('../../services/knime/fileReader');
const writeParametersToFile = require('../../services/knime/fileWriter');
const KnimeException = require('../../exceptions/knime');

let isLocked = false;
const pathToKnime = 'C:\\Program Files\\KNIME\\knime.exe';
const pathToWorkflowDir = 'C:\\Users\\Admin\\knime-workspace\\COI checker 1';

const lock = () => {
  if (isLocked) throw new KnimeException('Another job is in progress!', 423);

  isLocked = true;
};
const unlock = () => isLocked = false;

const runKnimeJob = async ({ firstName, lastName }) => {
  lock();
  writeParametersToFile({ firstName, lastName });

  // const { stdout, error } = await execFile('node', ['--version']);
  const { stdout, error } = await spawn(pathToKnime, [
    '-consoleLog',
    '-reset',
    '-nosave',
    // '-noexit',
    '-nosplash',
    '-application',
    'org.knime.product.KNIME_BATCH_APPLICATION',
    `-workflowDir=${pathToWorkflowDir}`,
    `-workflow.variable=lastName,${lastName},String`,
    `-workflow.variable=firstName,${firstName},String`
  ]);

  if (error) throw error;

  const result = readCVSFile();
  unlock();

  return result;
};

module.exports = runKnimeJob;