const fs = require("fs");

const writeFile = (path, content) => {
  fs.writeFile(path, content, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

module.exports = { writeFile };
