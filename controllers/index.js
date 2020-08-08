const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Event = require("../models/event");
const Message = require("../models/message");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const SALT_ROUNDS = 11;
const TOKEN_KEY = process.env.TOKEN_KEY;

// Helper functions
// given a req, determine the user_ID from the token. this lets us know which user based on their token has tried to access a route
const userOfRequest = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const legit = jwt.verify(token, TOKEN_KEY);

    if (legit) {
      return legit;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// USERS - Auth
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
      admin_key: user.admin_key,
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    return res.status(201).json({ user: payload, token });
  } catch (error) {
    console.log("Error in signUp");
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
        admin_key: user.admin_key,
      };
      const token = jwt.sign(payload, TOKEN_KEY);
      return res.status(201).json({ user: payload, token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//verify user
const verifyUser = async (req, res) => {
  try {
    // can only verify with JWT
    const legit = await userOfRequest(req);

    if (legit) return res.status(200).json({ user: legit });
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//user profile
const userProfile = async (req, res) => {
  try {
    // can only request user's own profile; they must have JWT
    const legit = await userOfRequest(req);

    if (legit) {
      const user = await User.findById(legit.id);
      // only returning a select number of data fields
      // returns more than verify user, which is only required to log in using localStorage's JWT
      const profile = {
        id: user._id,
        username: user.username,
        name: user.name,
        friends: user.friends,
      };

      return res.status(200).json({ user: profile });
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// EVENTS
// get all events, option to query for public
const getEvents = async (req, res) => {
  try {
    const isPublic = req.query.public; 

    if (typeof isPublic === 'string') {
      console.log('Checking public events: ')
      const publicEvents = await Event.find({
        isPublic: true,
      });

      return res.status(200).json(publicEvents);
    }

    // if not public, check events that this user created or is attending
    const legit = await userOfRequest(req);

    if (legit) {
      const createdEvents = await Event.find({
        creator: legit.id,
      });

      const attendingEvents = await Event.find({
        attendees: { $in: [legit.id] },
      });

      return res.status(200).json({
        createdEvents,
        attendingEvents,
      });
    }

    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get one event
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create one event
const createEvent = async (req, res) => {
  try {
    // needs to be logged in to create and will be the creator
    const legit = await userOfRequest(req);

    if (legit) {
      const eventData = req.body;

      // assumes eventData.date has a valid string of date format
      eventData.date = new Date(eventData.date);
      eventData.creator = legit.id;
      eventData.attendees = [];
      const event = await new Event(eventData);

      await event.save();

      return res.status(200).json(event);
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// edit one event by id
const editEvent = async (req, res) => {
  try {
    // needs to be logged in and must match the creator
    const legit = await userOfRequest(req);

    if (legit) {
      const event = await Event.findById(req.params.id);

      if (legit.id !== event.creator.toString()) {
        return res.status(401).send("Not Authorized");
      }

      const eventData = req.body;

      // assumes eventData.date has a valid string of date format
      if (eventData.date) {
        eventData.date = new Date(eventData.date);
      }

      await Event.findByIdAndUpdate(
        req.params.id,
        eventData,
        { new: true },
        (error, event) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          if (!event) {
            return res.status(404).json({ message: "Event not found!" });
          }
          return res.status(200).json(event);
        }
      );
    } else {
      return res.status(401).send("Not Authorized");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete an event
const deleteEvent = async (req, res) => {
  try {
    // needs to be logged in to create and will be the creator
    const legit = await userOfRequest(req);

    if (legit) {
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(401).send("No Event Found");
      }

      // only the creator may delete the event
      if (legit.id !== event.creator.toString()) {
        return res.status(401).send("Not Authorized");
      }

      const deletion = await Event.findByIdAndDelete(req.params.id);

      return res.status(200).json(deletion);
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// search events with search term (return public events)
// Using $or with multiple fields 
// https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
const searchEvents = async (req, res) => {
  try {
    const {term} = req.params;

    const events = await Event.find({
      $or: [
        { "event_name": { $regex: term, $options: "i" } },
        { "description": { $regex: term, $options: "i" } }
      ]
    });

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// MESSAGES
// post with subject, content and recipients
// recipients is a string of usernames separated by commas and spaces
const sendMessage = async (req, res) => {
  try {
    // creator of message is defined by user's JWT
    const legit = await userOfRequest(req);

    if (legit) {
      const creator = legit.id;
      let { subject, content, recipients } = req.body;

      if (!content) content = "-- No Message Body --";
      if (!subject) subject = "-- No Subject Header --";
      console.log(subject, content);

      // recipients need to be turned into user ids
      // it is a string of usernames

      // first split by space, join, and then split by comma
      recipients = recipients.split(" ").join("").split(",");
      const validRecips = [];

      // find which usernames have valid ids
      for (let i = 0; i < recipients.length; i++) {
        const username = recipients[i];
        try {
          // try to grab a valid user via username
          const user = await User.find({ username });
          console.log(user);
          if (user.length > 0) {
            validRecips.push({
              username,
              id: user[0]._id,
            });
          } else {
            validRecips.push({
              username,
              id: null,
            });
          }
        } catch {
          // no valid user found
          validRecips.push({
            username,
            id: null,
          });
        }
      }

      // take usernames that have valid ids and make an array of only ids
      const validRecipIds = validRecips
        .filter((user) => user.id)
        .map((user) => user.id);

      const newMessage = await new Message({
        creator,
        subject,
        content,
        recipients: validRecipIds,
      });

      await newMessage.save();

      // return a response with separate successful and failed usernames
      const successful = validRecips
        .filter((user) => user.id)
        .map((user) => user.username);
      const failed = validRecips
        .filter((user) => !user.id)
        .map((user) => user.username);

      return res.status(200).json({
        subject,
        content,
        successful,
        failed,
      });
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// receive all messages that belong to the user with JWT
const getMessages = async (req, res) => {
  try {
    // recipient of message is defined by user's JWT
    const legit = await userOfRequest(req);

    if (legit) {
      // if type = sent as query
      const { sent } = req.query;

      if (typeof sent === "string") {
        // find messages that match the creator
        const messages = await Message.find({
          creator: legit.id,
        });

        return res.status(200).json(messages);
      } else {
        // find messages that contain the user's id in recipients
        // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
        // using $in or $all works when it's one value you are looking for
        const messages = await Message.find({
          recipients: { $in: [legit.id] },
        });

        return res.status(200).json(messages);
      }
    }
    return res.status(401).send("Not Authorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Friends - part of USERS

// create or try to create friend request 
const createFriendRequest = async (req, res) => {
  try {
    // 1. check if logged in user 
    // 2. check if recipient_id is legitimate 
    // 3. check if friend request either way already exists 
    // 4. create friend request 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// export functions

module.exports = {
  signUp,
  signIn,
  verifyUser,
  userProfile,
  sendMessage,
  getMessages,
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
  searchEvents
};
