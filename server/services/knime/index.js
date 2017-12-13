const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const { addProcess, removeProcesses, deleteProcess, getProcesses, completeProcess, failProcess, updateProcess } = require('../process');
const readDir = require('../../services/knime/readDirectory');
const STATUS = require('../../models/process/status');
const settings = require('../../settings');

const EXPIRE_TIME = 24 * 60 * 60 * 1000;
const CSV_EXTENSION = '.csv';

const removeProcess = key => {
  const pathToProcessesDir = settings.getItem('knimeResultsPath');
  console.log('removing', `${pathToProcessesDir}${path.sep}${key}`);
  fs.unlinkSync(`${pathToProcessesDir}${path.sep}${key}`);
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

const concatFirstAndLastName = p => `${p.lastName.trim().toUpperCase()}, ${p.firstName.trim().toUpperCase()}`;
const concatToMemo = (memo, name, idx) => memo.concat(idx > 0 ? ';' : '').concat(name);

const runKnimeJob = (persons = []) => {
  const authors = persons.filter(p => p.role === 'author')
    .map(concatFirstAndLastName)
    .reduce(concatToMemo, '');

  const referees = persons.filter(p => p.role === 'referee')
    .map(concatFirstAndLastName)
    .reduce(concatToMemo, '');

  const date = Date.now();
  const pathToKnime = settings.getItem('knimePath');
  const pathToWorkflowDir = settings.getItem('knimeJobPath');
  const pathToProcessesDir = settings.getItem('knimeResultsPath');

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

  subprocess.on('close', code => code === 0 ? completeProcess(process) : failProcess(process));
  subprocess.on('exit', code => code === 0 ? completeProcess(process) : failProcess(process));
  subprocess.on('error', err => failProcess(process));

  return buildResponse();
};

module.exports = {
  runKnimeJob,
  getProcesses: cleanAndGetProcesses,
  registerExistingFiles,
};