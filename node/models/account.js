const Sequelize = require('sequelize');
var connection = require('../database/connection');

var Account = connection.define('account', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  currency: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.STRING
  }
});

module.exports = Account;
