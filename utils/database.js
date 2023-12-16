const mongoose = require("mongoose");

const connectToDB = (callback) => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to database successfully");
      callback();
    })
    .catch((err) => console.log(err));
};
module.exports = connectToDB;
