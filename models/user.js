const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password_digest: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

User.plugin(uniqueValidator);

module.exports = mongoose.model('user', User);