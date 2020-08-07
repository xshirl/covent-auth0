const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    subject: {
      type: String,
      required: true,
      default: '-- No Subject Text --'
    },
    content: {
      type: String,
      required: true,
      default: '-- No Message Body --'
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    recipients: [{
      type: Schema.Types.ObjectId,
      ref: "user,",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", Message);
