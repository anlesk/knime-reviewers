const { isEmpty } = require('lodash');

let currentProcess = {};

const setProcess = process => Object.assign(currentProcess, process);
const getProcess = () => currentProcess;
const resetProcess = () => currentProcess = {};
const isProcessInProgress = () => !isEmpty(currentProcess);


module.exports = {
  setProcess,
  getProcess,
  resetProcess,
  isProcessInProgress,
};
