const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendRequest = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('friendRequests', FriendRequest);