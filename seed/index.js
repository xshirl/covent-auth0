const bcrypt = require('bcrypt');
const db = require('../db');
const User = require('../models/user');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const SALT_ROUNDS = 11;

const createUsers = async () => {
  const users = [
    {
      username: 'ah',
      name: 'Andrew H',
      password_digest: bcrypt.hashSync('123321', SALT_ROUNDS)
    }
  ];
  await User.insertMany(users);
  console.log('Successfully created users!');
};

const run = async () => {
  await createUsers();
  db.close();
};

run();

