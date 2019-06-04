const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const app = express();

app.use(express.json());

module.exports = app;
