const mongoose = require('mongoose');
const { server } = require('./src/app');
const { connectDb } = require('./config/database');
require('dotenv').config({ path: '.env.test' });


beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});
