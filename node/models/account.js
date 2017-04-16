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

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// var accountSchema = new Schema({
//   name: String,
//   type: String,
//   currency: String,
//   balance: Number,
//   transactions: [{type: Schema.Types.ObjectId, ref: 'Transaction'}]
// });
//
// var Account = mongoose.model('Account', accountSchema);
//
// module.exports = Account;
