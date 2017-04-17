const Sequelize = require('sequelize');
var connection = require('../database/connection');

var Account = connection.define('account', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM('Current', 'Saving', 'ISA', 'Cash')
  },
  currency: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.STRING
  }
});

module.exports = Account;
