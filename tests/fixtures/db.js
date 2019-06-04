const User = require('../../src/models/user');

const setupDatabase = async () => {
  await User.deleteMany();
};

module.exports = { setupDatabase };
