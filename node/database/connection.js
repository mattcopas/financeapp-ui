const mongoose = require('mongoose');

module.exports = function() {
  console.log("Connecting to DB");
  mongoose.connect('localhost:27017/financeapp').then(function() {
    console.log("DB Connection successful");8
  }, function(error) {
    console.log('Error connecting to DB:');
    console.log(error);
    throw error;
  });
};
