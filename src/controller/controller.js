const programs = require("../programs/program");
const responseBuilder = require("../helper/responseBuilder");

function calculateSquare(request, response) {
  let number = request.query.number;
  let square = programs.squareOfNumber(number);
  return response.send(
    responseBuilder.buildSucessResponse({ number: number, square: square })
  );
}

module.exports = { calculateSquare };
