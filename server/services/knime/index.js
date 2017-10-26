const { spawn } = require('child_process');
const fs = require('fs');
const readCVSFile = require('../../services/knime/fileReader');
const KnimeException = require('../../exceptions/knime');
const { addProcess, removeProcesses, deleteProcess, getProcesses, completeProcess } = require('../process');

const pathToKnime = 'C:\\Program Files\\KNIME\\knime.exe';
const pathToProcessesDir = 'C:\\Users\\Admin\\KNIME\\results';
const pathToWorkflowDir = 'C:\\Users\\Admin\\knime-workspace\\COI checker 1';
const EXPIRE_TIME = 24 * 60 * 60 * 1000;

const removeProcess = key => {
  fs.unlinkSync(`${pathToProcessesDir}/${key}`);
  deleteProcess(key);
};
const removeExpiredProcesses = (expireTime = EXPIRE_TIME) => Object.keys(getProcesses())
  .filter(key => (Math.abs(new Date(key) - Date.now()) > expireTime))
  .forEach(key => removeProcess(key));

const buildResponse = () => getProcesses();

const runKnimeJob = async ({ firstName, lastName }) => {
  removeExpiredProcesses();

  const subprocess = spawn(pathToKnime, [
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

  const process = {
    id: Date.now(),
    date: Date.now(),
    pid: subprocess.pid,
    persons: {},
    firstName,
    lastName,
  };

  const processes = addProcess(process);

  console.log(processes, getProcesses(), buildResponse());

  subprocess.on('close', (code) => {
    if (code !== 0) {
      console.log(`subprocess process exited with code ${code}`);
    }

    completeProcess(process);
  });

  return buildResponse();
};

module.exports = {
  runKnimeJob,
  getProcesses,
};