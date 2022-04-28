/* const programs = require("./src/programs/program");
const read = require("./src/filesystem/readfiles");
const write = require("./src/filesystem/writefile");
console.log("Hello node");
console.log(programs.add(1, 3));
console.log(programs.sub(5, 2));
programs.wait(5000, "data");
// read.readFiles("./src/docs");
write.writeFile("./src/docs/write", "write.txt", " Write to file s"); */

const express = require("express");
const controller = require("./src/controller/controller");
const apiRoutes = require("./src/routes/index");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3005;
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use("/api/v1", apiRoutes);

app.get("/squareRoot", controller.calculateSquare);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
