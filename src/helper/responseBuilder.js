function buildSucessResponse(data) {
  return { code: 200, message: "Request was sucessfull", data: data };
}

function buildFailureResponse(errorMessage) {
  return { code: 400, message: "Request was unsucessfull", errorMessage: errorMessage };
}

module.exports = { buildSucessResponse, buildFailureResponse };
