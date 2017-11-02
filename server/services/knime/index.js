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
  console.log('removing', `${pathToProcessesDir}/${key}`);
  fs.unlinkSync(`${pathToProcessesDir}/${key}`);
  deleteProcess(key);
};
const removeExpiredProcesses = (expireTime = EXPIRE_TIME) => Object.entries(getProcesses())
  .filter(([key, { date }]) => (Math.abs(new Date(date) - Date.now()) > expireTime))
  .forEach(([key]) => removeProcess(key));

const cleanAndGetProcesses = () => {
  removeExpiredProcesses();
  return getProcesses();
};

const buildProcess = ({ subprocess = {}, id = Date.now(), date = Date.now(), persons, ...args }) => ({
  id,
  date,
  pid: subprocess.pid,
  persons,
  ...args,
});

const registerExistingFiles = () => readDir()
  .forEach(({ name, date }) => addProcess(buildProcess({ id: name, date, status: STATUS.COMPLETE })));

const buildResponse = () => getProcesses();

const concatFirstAndLastName = p => `'${p.lastName.toUpperCase()}, ${p.firstName.toUpperCase()}'`;
const concatToMemo = (memo, name, idx) => memo.concat(idx > 0 ? ',' : '').concat(name);

const runKnimeJob = (persons = []) => {
  const authors = persons.filter(p => p.role === 'author')
    .map(concatFirstAndLastName)
    .reduce(concatToMemo, '');

  const referees = persons.filter(p => p.role === 'referee')
    .map(concatFirstAndLastName)
    .reduce(concatToMemo, '');

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
    `-workflow.variable=authors,"${authors}",String`,
    `-workflow.variable=referees,"${referees}",String`
  ]);

  const process = buildProcess({ subprocess, id: (date + CSV_EXTENSION), date, persons });
  const processes = addProcess(process);

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
  getProcesses: cleanAndGetProcesses,
  registerExistingFiles,
};