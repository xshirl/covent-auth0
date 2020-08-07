const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = new Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: "user,",
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("event", Event);
