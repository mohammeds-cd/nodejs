const router = require("express").Router();
const responseBuilder = require("../../helper/responseBuilder");

let godownList = [
  { id: 1, name: "Godown 1", location: "Hyderabad" },
  { id: 2, name: "Godown 2", location: "Bangalore" },
  { id: 3, name: "Godown 3", location: "Chennai" },
];

router.get("/getGodowns", (request, response) => {
  return response.send(
    responseBuilder.buildSucessResponse({ godownList: godownList })
  );
});

router.get("/getGodownById", (request, response) => {
  let godown = godownList.find((godown) => godown.id == request.query.id);
  return response.send(responseBuilder.buildSucessResponse({ godown: godown }));
});

module.exports = router;
