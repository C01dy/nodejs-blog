const { createOne } = require('../models/user');

const createUser = async (req, res) => {
  try {
    const userData = {
      firstName: 'vasya',
      lastName: 'popov',
      email: 'vasyapopov@gmail.com',
      password: '12345',
      username: 'vas12',
    };
    await createOne(userData);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
};
