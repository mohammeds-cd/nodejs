const router = require("express").Router();
const responseBuilder = require("../../helper/responseBuilder");
const fs = require("fs");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "data.json");
const jsonFile = require('../../helper/jsonFile');

router.get("/getGodowns", (request, response) => {
  let godowns = jsonFile.getJsonFile(jsonPath);
  let data;
  let length = Object.keys(request.query).length;
  let filters = request.query;
  if (length == 0) {
    data = godowns;
  } else {
    data = godowns.filter((godown) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && godown[key] == filters[key];
      }
      return isValid;
    });
  }
  return response.send(
    responseBuilder.buildSucessResponse({ godownList: data })
  );
});

router.post("/saveGodown", (request, response) => {
  let godowns = jsonFile.getJsonFile(jsonPath);
  let newGodown = request.body;
  let godownExists = false;
  for (const godown of godowns) {
    if (godown.name === newGodown.name) {
      godownExists = true;
      break;
    }
  }
  if (godownExists) {
    response.send(responseBuilder.buildFailureResponse("Godown name already exists!"));
  } else {
    godowns.push(newGodown);
    jsonFile.writeJsonFile(jsonPath, godowns);
    return response.send(
      responseBuilder.buildSucessResponse({ godown: newGodown })
    );
  }
});

module.exports = router;
