const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const app = express();

app.use(express.json());
app.use(userRouter);

module.exports = app;
