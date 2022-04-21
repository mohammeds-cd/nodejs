const programs = require('./src/programs/program');
const files = require('./src/filesystem/readfiles')

console.log("Hello node");
// console.log(programs.add(1,3));
// console.log(programs.sub(5,2));
programs.wait(5000,"data");
files.readFiles('./src/docs');
