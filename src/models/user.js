const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    validate(age) {
      if (age < 0) {
        throw new Error('Age must be a positive number');
      } else if (age > 120) {
        throw new Error('Age exceeded the human lifespan')
      }
    }
  },
  sex: {
    type: String,
    required: true,
    validate(value) {
      if (!/male|female/i.test(value)) {
        throw new Error('Sex can either be male or female');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
}, {
  timestamps: true
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {_id: user._id.toString()},
    process.env.JWT_SECRET,
    {expiresIn: '7 days'}
  );

  user.tokens = user.tokens.concat({token});

  await user.save();

  return token;
};

module.exports = mongoose.model('User', userSchema);