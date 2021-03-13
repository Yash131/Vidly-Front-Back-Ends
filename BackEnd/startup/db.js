const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  let db = config.get('db')
  db = "mongodb+srv://admin:admin1234@vidly.hsmmg.mongodb.net/vidlystore?authSource=admin&replicaSet=atlas-dxivrc-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to MongoDB...`));
};
