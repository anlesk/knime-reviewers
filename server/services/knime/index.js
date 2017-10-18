const spawn = require('child-process-promise').spawn;
const readCVSFile = require('../../services/knime/fileReader');
const writeParametersToFile = require('../../services/knime/fileWriter');
const KnimeException = require('../../exceptions/knime');

let isLocked = false;
const pathToKnime = 'C:\\Program Files\\KNIME\\knime.exe';
const pathToWorkflowDir = 'C:\\Users\\Admin\\knime-workspace\\COI checker 1';

const lock = () => {
  if (isLocked) throw new KnimeException('Sorry, another job is being processed. Please come back later!', 423);

  isLocked = true;
};
const unlock = () => isLocked = false;

const runKnimeJob = async ({ firstName, lastName }) => {
  lock();
  writeParametersToFile({ firstName, lastName });

  const promise = spawn(pathToKnime, [
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
  const childProcess = promise.childProcess;
  console.log('[spawn] childProcess.pid: ', childProcess.pid);

  await promise;
  const result = readCVSFile();
  unlock();

  return result;
};

module.exports = runKnimeJob;