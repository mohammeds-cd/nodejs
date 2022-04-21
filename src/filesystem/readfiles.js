const fs = require("fs");

const readFiles = (path) => {
  fs.readdir(path, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((fileName) => {
        // console.log(fileName);
        fs.readFile(`${path}/${fileName}`, "utf8", (err, content) => {
          if (err) console.log(err);
          else {
            console.log(content);
          }
        });
      });
    }
  });
};

module.exports = { readFiles };
