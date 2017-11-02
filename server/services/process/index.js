const STATUS = require('../../models/process/status');

let processes = {};

const addProcess = process => Object.assign(processes, { ...processes, [process.id]: { status: STATUS.IN_PROGRESS, ...process } });
const deleteProcess = processKey => delete processes[processKey];
const removeProcesses = () => processes = {};
const getProcesses = () => processes;
const updateProcess = process => Object.assign(processes, { ...processes, [process.id]: process });
const completeProcess = process => Object.assign(processes, { ...processes, [process.id]: { ...processes[process.id], status: STATUS.COMPLETE } });
const failProcess = process => Object.assign(processes, { ...processes, [process.id]: { ...processes[process.id], status: STATUS.FAILED } });

module.exports = {
  addProcess,
  deleteProcess,
  getProcesses,
  updateProcess,
  removeProcesses,
  completeProcess,
  failProcess,
};
