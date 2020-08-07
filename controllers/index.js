const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

db.on("error", console.error.bind(console, "MongoDB connection error:"));
