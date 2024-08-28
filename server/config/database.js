const mongoose = require('mongoose');

const connectDb = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect('mongodb://127.0.0.1:27017/cohort-tools-api')
    .then(x => {
      console.log(`Connected to Database: "${x.connections[0].name}"`);
    })
    .catch(err => {
      console.error("Error connecting to MongoDB", err);
    });
};

module.exports = { connectDb };
