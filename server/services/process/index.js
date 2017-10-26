let processes = {};

const STATUS = {
  COMPLETE: 'complete',
  IN_PROGRESS: 'in progress',
  FAILED: 'failed',
};

const addProcess = process => Object.assign(processes, { ...processes, [process.id]: { ...process, status: STATUS.IN_PROGRESS } });
const deleteProcess = processKey => delete processes[processKey];
const removeProcesses = () => processes = {};
const getProcesses = () => processes;
const updateProcess = process => Object.assign(processes, { ...processes, [process.id]: process });
const completeProcess = process => Object.assign(processes, { ...processes, [process.id]: { ...processes[process.id], status: STATUS.COMPLETE } });

module.exports = {
  addProcess,
  deleteProcess,
  getProcesses,
  updateProcess,
  removeProcesses,
  completeProcess,
};
