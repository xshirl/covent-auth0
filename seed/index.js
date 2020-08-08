const bcrypt = require('bcrypt');
const db = require('../db');
const User = require('../models/user');
const Event = require('../models/event')
const Message = require('../models/message')
const FriendRequest = require('../models/friendRequest')

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const SALT_ROUNDS = 11;

const createSeedData = async () => {

  await User.deleteMany()
  await Event.deleteMany()
  await Message.deleteMany()

  const users = [
    {
      username: 'ah',
      name: 'Andrew H',
      password_digest: bcrypt.hashSync('123321', SALT_ROUNDS),
      friends: []
    },
    {
      username: 'sx',
      name: 'Shirley X',
      password_digest: bcrypt.hashSync('123456', SALT_ROUNDS),
      friends: []
    }
  ];
  const seededUsers = await User.insertMany(users);
  console.log('Successfully created users!');
  
  const events = [
    {
      event_name: 'Meet and Greet at Central Park',
      description: 'Meet and greet all the members of our development team while properly wearing masks and social distancing at Central Park!',
      date: new Date(),
      startTime: '5:00 PM',
      isPublic: true,
      creator: seededUsers[0]['_id'],
      attendees: [
        seededUsers[0]['_id'],
        seededUsers[1]['_id']
      ]
    },
    {
      event_name: 'Development Meeting',
      description: 'Important meeting for all hands on the project!',
      date: new Date(),
      startTime: '9:00 PM',
      isPublic: false,
      creator: seededUsers[1]['_id'],
      attendees: [
        seededUsers[0]['_id'],
        seededUsers[1]['_id']
      ]
    }
  ];
  await Event.insertMany(events);
  console.log('Successfully created events!');

  const messages = [
    {
      creator: seededUsers[0]['_id'],
      recipients: [
        seededUsers[0]['_id'],
        seededUsers[1]['_id']
      ],
      subject: 'About the meetup',
      content: 'It will be held remotely instead, sorry!'
    }
  ];

  await Message.insertMany(messages);
  console.log('Successfully created messages!');

  const friendRequests = [
    {
      creator: seededUsers[0]['_id'],
      recipient: seededUsers[1]['_id']
    }
  ];

  await FriendRequest.insertMany(friendRequests);
  console.log('Successfully created friendRequests!');
};

const run = async () => {
  try {
    await createSeedData();
    db.close();
  } catch (error) {
    console.log(error)
  }
};

run();

