'use strict';

const yargs = require('yargs');
const debugModule = require('debug');
const os = require('os');
const path = require('path');

const settings = require('./settings');
const runApp = require('./app');

const debug = debugModule('app:server:main');
const defaultHost = 'localhost';
const defaultPort = '9000';
const defaultKnimePath = `C:${path.sep}Program Files${path.sep}KNIME${path.sep}knime.exe`;
const defaultKnimeJobPath = `${os.homedir}${path.sep}knime-workspace${path.sep}COI checker 1`;
const defaultKnimeResultsPath = `${os.homedir}${path.sep}knime${path.sep}results`;

const argv = yargs
  .command('npm run server', 'Run app')
  .options({
    h: {
      alias: 'host',
      default: defaultHost,
      desc: 'Host for frontend',
      string: true,
      type: 'string',
    },
    p: {
      alias: 'port',
      default: defaultPort,
      desc: 'Port for frontend',
      number: true,
      type: 'number',
    },
    kp: {
      alias: 'knimePath',
      default: defaultKnimePath,
      desc: 'Path to KNIME executable',
      string: true,
      type: 'string',
    },
    kjp: {
      alias: 'knimeJobPath',
      default: defaultKnimeJobPath,
      desc: 'Path to knime job',
      string: true,
      type: 'string',
    },
    krp: {
      alias: 'knimeResultsPath',
      default: defaultKnimeResultsPath,
      desc: 'Path to knime results',
      string: true,
      type: 'string',
    },
  })
  .version()
  .alias('v', 'version')
  .help('?')
  .alias('?', 'help')
  .example('npm run server -- --host localhost --port 8082', 'Set frontend host and port')
  .argv;

debug(`frontend = http://${argv.host}:${argv.port}`);

settings.setItem('knimePath', argv.kp);
settings.setItem('knimeJobPath', argv.kjp);
settings.setItem('knimeResultsPath', argv.krp);

const app = runApp();

app.listen(argv.port, argv.host, () => {
  console.log(`App listening on ${argv.host}:${argv.port}!`);
});