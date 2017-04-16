const Sequelize = require('sequelize');
var connection = require('../database/connection');

var Transaction = connection.define('transaction', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.FLOAT
  }
});

module.exports = Transaction;
