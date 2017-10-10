const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');

const FILEPATH = './example/example.csv';
let output = [];
const parser = parse({delimiter: ','});
const input = fs.createReadStream(FILEPATH);
const transformer = transform(function (record, callback) {
  setTimeout(function () {
    callback(null, record.join(' ') + '\n');
  }, 500);
}, { parallel: 10 });

const r = fs.readFileSync(FILEPATH);
const resutlt = parse(r, { columns: true });

console.log(resutlt)

const parser2 = parse({ columns: true }, function(err, data){
  console.log(data);
});

const readKnimeResult = async () => await pa

// // module.exports
// const a = input
//   .pipe(parser2);
  // .pipe(transformer)
  // .pipe(process.stdout);

// console.log(a)