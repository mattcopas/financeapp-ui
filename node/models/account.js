const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema({
  name: String,
  type: String,
  currency: String,
  balance: Number,
  transactions: [{type: Schema.Types.ObjectId, ref: 'Transaction'}]
});

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;
