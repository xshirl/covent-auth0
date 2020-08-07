const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    subject: {
      type: String,
      required: true,
      default: '-- No Subject Header --'
    },
    content: {
      type: String,
      required: true,
      default: '-- No Message Body --'
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    recipients: [{
      type: Schema.Types.ObjectId,
      ref: "users",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("messages", Message);
