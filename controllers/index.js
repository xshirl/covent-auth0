const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const Event = require("../models/event");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const SALT_ROUNDS = 11;
const TOKEN_KEY = process.env.TOKEN_KEY 

// Helper functions
// given a req, determine the user_ID from the token. this lets us know which user based on their token has tried to access a route 
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)

    if (legit) {
      return legit
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

//USERS
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { username, name, password, admin_key } = req.body;
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await new User({
      username,
      name,
      password_digest,
      admin_key,
    });
    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
      admin_key: user.admin_key
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    return res.status(201).json({ user: payload, token });
  } catch (error) {
    console.log('Error in signUp');
    return res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        name: user.name,
        admin_key: user.admin_key
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      return res.status(201).json({ user: payload , token });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update your own profile 
const updateUser = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const data = jwt.verify(token, TOKEN_KEY);
  const tokenUserId = data.id;

  if (tokenUserId === id) {
    await User.findByIdAndUpdate(id, req.body, { new: true }, (error, user) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (!user) {
        return res.status(404).json({ message: 'User is not found!' });
      }
      res.status(200).json({user});
    });
  } else {
    res.status(403).send('Unauthorized');
  }
};

//verify user
const verifyUser = async (req, res) => {
  try {
    const legit = await userOfRequest(req);

    if (legit) return res.status(200).json({ user: legit });
    return res.status(401).send('Not Authorized');
  } catch (error) {
    res.status(500).send('Verify User - Server Error');
  }
}

module.exports = {
  signUp, signIn, verifyUser 
}
