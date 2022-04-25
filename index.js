const programs = require('./src/programs/program');
const read = require('./src/filesystem/readfiles');
const write = require('./src/filesystem/writefile');

console.log("Hello node");
// console.log(programs.add(1,3));
// console.log(programs.sub(5,2));
programs.wait(5000,"data");
write.writeFile('./src/docs/write.txt',"Write to file");
read.readFiles('./src/docs');
