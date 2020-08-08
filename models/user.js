const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true
    },
    password_digest: {
      type: String,
      required: true,
    },
    facebookProvider: {
      type: {
        id: String,
        token: String,
      },
    },
    googleProvider: {
      type: {
        id: String,
        token: String,
      },
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

User.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne(
    {
      "facebookProvider.id": profile.id,
    },
    function (err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken,
          },
        });

        newUser.save(function (error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

User.statics.upsertGoogleUser = function (
  accessToken,
  refreshToken,
  profile,
  cb
) {
  var that = this;
  return this.findOne(
    {
      "googleProvider.id": profile.id,
    },
    function (err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          googleProvider: {
            id: profile.id,
            token: accessToken,
          },
        });

        newUser.save(function (error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    }
  );
};

User.plugin(uniqueValidator);

module.exports = mongoose.model("users", User);
