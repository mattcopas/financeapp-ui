const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var transactionSchema = new Schema({
  name: String,
  currency: String,
  amount: Number,
  type: String,
  from: {type: Schema.Types.ObjectId, ref: 'Account'},
  to: 
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
