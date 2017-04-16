const Sequelize = require('sequelize');
var connection = require('../database/connection');

var Transaction = connection.define('transaction', {
  name: {
    type: Sequelize.STRING
  },
  amountIn: {
    type: Sequelize.FLOAT
  },
  amountOut: {
    type: Sequelize.FLOAT
  },
  testFIeld: {
    type: Sequelize.STRING
  }
});

module.exports = Transaction;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// var transactionSchema = new Schema({
//   name: String,
//   currency: String,
//   amount: Number,
//   type: String,
//   from: {type: Schema.Types.ObjectId, ref: 'Account'},
//   to:
// });
//
// var Transaction = mongoose.model('Transaction', transactionSchema);
//
// module.exports = Transaction;
