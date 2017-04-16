var connection = require('../database/connection');
var Account = require('../models/account');

var TransactionService = {

  addTransaction: function(transaction, accountId) {
    return connection.transaction(function(t) {
      return transaction.save({transaction: t})
        .then(function(transaction) {
          return Account.findById(accountId, {transaction: t})
            .then(function(account) {
              return account.addTransaction(transaction, {transaction: t})
            });
        });
    }).then(function(result) {
      console.log("Transaction commited");
    }).catch(function(err) {
      console.log("Transaction error: ", err);
    });
  }
}

module.exports = TransactionService;
