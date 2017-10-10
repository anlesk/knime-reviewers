'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`App listening on port ${PORT}!`);
});