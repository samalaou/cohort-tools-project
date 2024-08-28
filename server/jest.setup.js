const mongoose = require('mongoose');
const { server } = require('./app');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/cohort-tools-api');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});
