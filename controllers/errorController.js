const AppError = require("../utils/appError");
const sendToDev = (err, response) => {
  response.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendToProd = (err, response) => {
  if (err.isOperational === true) {
    response.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error ", err);
    response.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} ${err.value}`;
  return new AppError(message, 400);
};
module.exports = (err, request, response, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendToDev(err, response);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    sendToProd(error, response);
  }
};
