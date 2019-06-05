const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {
  userOneId,
  userOne,
  setupDatabase
} = require('./fixtures/db');

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

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      email: 'nicky@example.com',
      name: 'Nicky',
      age: 25,
      sex: 'male'
    },
    token: user.tokens[0].token
  });

  // Assert password isn't stored as plaintext in database
  expect(user.password).not.toBe('12345678');
});


test('Login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  
  // Assert new token is saved to database
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      email: 'jane@example.com',
      name: 'Jane',
      age: 20,
      sex: 'female'
    },
    token: user.tokens[1].token
  });
});

test('Logout user', async () => {
  const response = await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});
