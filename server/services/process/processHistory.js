let processHistory = {};

const addProcess = process => Object.assign(processHistory, { [`${process.pid}.${process.date}`]: process });
const deleteProcess = processKey => delete processHistory[processKey];
const clearHistory = () => processHistory = {};
const getStoredProcesses = () => processHistory;

module.exports = {
  addProcess,
  clearHistory,
  deleteProcess,
  getStoredProcesses,
};
