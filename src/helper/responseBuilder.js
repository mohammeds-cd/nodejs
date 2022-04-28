function buildSucessResponse(data) {
  return { code: 200, message: "Request was sucessfull", data: data };
}

module.exports = { buildSucessResponse };
