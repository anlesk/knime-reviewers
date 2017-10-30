const path = require('path');
const os = require('os');

const pathToProcessesDir = `${os.homedir}${path.sep}KNIME${path.sep}results`;

module.exports = {
  pathToProcessesDir
};
