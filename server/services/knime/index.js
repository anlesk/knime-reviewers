const { spawn } = require('child_process');
const fs = require('fs');
const { addProcess, removeProcesses, deleteProcess, getProcesses, completeProcess } = require('../process');
const readDir = require('../../services/knime/readDirectory');
const STATUS = require('../../models/process/status');
const { pathToProcessesDir } = require('../../constants');

const pathToKnime = 'C:\\Program Files\\KNIME\\knime.exe';
const pathToWorkflowDir = 'C:\\Users\\Admin\\knime-workspace\\COI checker 1';
const EXPIRE_TIME = 24 * 60 * 60 * 1000;
const CSV_EXTENSION = '.csv';

const removeProcess = key => {
  fs.unlinkSync(`${pathToProcessesDir}/${key}`);
  deleteProcess(key);
};
const removeExpiredProcesses = (expireTime = EXPIRE_TIME) => Object.keys(getProcesses())
  .filter(key => (Math.abs(new Date(key) - Date.now()) > expireTime))
  .forEach(key => removeProcess(key));

const buildProcess = ({ subprocess = {}, id = Date.now(), date = Date.now(), ...args }) => ({
  id,
  date,
  pid: subprocess.pid,
  persons: args,
  ...args,
});

const registerExistingFiles = () => readDir()
  .forEach(({ name, date }) => addProcess(buildProcess({ id: name, date, status: STATUS.COMPLETE })));

const buildResponse = () => getProcesses();

const runKnimeJob = async (args) => {
  const { firstName, lastName } = args[0];

  removeExpiredProcesses();

  const date = Date.now();
  const subprocess = spawn(pathToKnime, [
    '-consoleLog',
    '-reset',
    '-nosave',
    // '-noexit',
    '-nosplash',
    '-application',
    'org.knime.product.KNIME_BATCH_APPLICATION',
    `-workflowDir=${pathToWorkflowDir}`,
    `-workflow.variable=fileName,${date},String`,
    `-workflow.variable=outputDir,${pathToProcessesDir},String`,
    `-workflow.variable=lastName,${lastName},String`,
    `-workflow.variable=firstName,${firstName},String`
  ]);

  const process = buildProcess({ subprocess, id: (date + CSV_EXTENSION), date, ...args });
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
  registerExistingFiles,
};