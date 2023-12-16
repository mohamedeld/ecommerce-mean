const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const connectToDB = require("./utils/database");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/brands", brandRoute);

// add cros
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// not found
app.all("*", (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server`, 404));
});

// handle all error
app.use(globalErrorHandler);

const PORT = process.env.PORT | 8080;
connectToDB(() => {
  app.listen(PORT, () => {
    console.log("port is running on port " + PORT);
  });
});
