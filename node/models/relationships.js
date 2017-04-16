var Account = require('./account');
var Transaction = require('./transaction');


module.exports = function() {
  Account.belongsToMany(Transaction, {through: 'AccountTransaction'});
  Transaction.belongsToMany(Account, {through: 'AccountTransaction'});
};
