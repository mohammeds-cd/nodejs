const fs = require("fs");

const writeFile = (path, filename, content) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.writeFile(`${path}/${filename}`, content, { flag: "wx" }, (err) => {
    if (err) {
      fs.appendFile(`${path}/${filename}`, content, (err) => {
        if (err) console.log(err);
        console.log("File appended");
      });
    } else {
      console.log("File saved.");
    }
  });
};

module.exports = { writeFile };
