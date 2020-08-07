const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("Successfully connectedt to MongoDB.");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
