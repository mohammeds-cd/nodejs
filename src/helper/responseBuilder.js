function buildResponse(data) {
  return { code: 200, message: "Request was sucessfull", data: data };
}

module.exports = { buildResponse };
