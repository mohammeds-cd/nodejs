const router = require("express").Router();
const responseBuilder = require("../../helper/responseBuilder");
const fs = require("fs");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "data.json");

router.get("/getGodowns", (request, response) => {
  fs.readFile(jsonPath, "utf8", (err, godowns) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    godowns = JSON.parse(godowns);
    let data;
    let length = Object.keys(request.query).length;
    if (length == 0) {
      data = godowns;
    } else {
      data = godowns.filter((godown) => {
        if (
          (length > 1 &&
            godown.location === request.query.location &&
            godown.name === request.query.name) ||
          (length == 1 && godown.location === request.query.location) ||
          godown.name === request.query.name
        ) {
          return true;
        }
        return false;
      });
    }
    return response.send(
      responseBuilder.buildSucessResponse({ godownList: data })
    );
  });
});

router.post("/saveGodown", (request, response) => {
  fs.readFile(jsonPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    let godowns = JSON.parse(jsonString);
    let godown = request.body;
    godowns.push(godown);
    fs.writeFile(jsonPath, JSON.stringify(godowns, null, 2), (err) => {
      if (err) {
        console.log("Failed to write updated data to file");
        return;
      }
      return response.send(
        responseBuilder.buildSucessResponse({ godown: godown })
      );
    });
  });
});

module.exports = router;
