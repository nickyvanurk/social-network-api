const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      "email": "nicky@example.com",
      "password": "12345678",
      "name": "Nicky",
      "age": 25,
      "sex": "male"
    })
    .expect(201);
  
  // Assert if user is saved to database
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
});
