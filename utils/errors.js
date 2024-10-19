module.exports = {
  err400: { status: 400, message: "Bad Request" },
  err401: { status: 401, message: "Authorization required" },
  err403: {
    status: 403,
    message: "Forbidden request",
  },
  err404: { status: 404, message: "Not Found" },
  err500: { status: 500, message: "Internal Server Error" },
};
