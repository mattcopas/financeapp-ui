var connection = require('../database/connection');
var Account = require('../models/account');

var TransactionService = {

  addTransaction: function(transaction, accountId) {
    var that = this;
    return connection.transaction(function(t) {
      return transaction.save({transaction: t})
        .then(function(transaction) {
          return Account.findById(accountId, {transaction: t})
            .then(function(account) {
              return account.addTransaction(transaction, {transaction: t})
                .then(function(accountTransaction) {
                  return that.getAccountFromAccountTransaction(accountTransaction, t)
                    .then(function(account) {
                      return that.updateAccountBalance(account.balance, transaction, account.id, t)
                    })
                });
            });
        });
    }).then(function(result) {
      console.log("Transaction commited");
    }).catch(function(err) {
      console.log("Transaction error: ", err);
    });
  },

  updateAccountBalance: function(initialBalance, transaction, accountId, t) {
    var newBalance = initialBalance;
    if(transaction.type === 'Income') {
      newBalance = parseFloat(initialBalance) + parseFloat(transaction.amount);
    }
    if(transaction.type === 'Expense') {
      newBalance = parseFloat(initialBalance) - parseFloat(transaction.amount);
    }
    return Account.update({
      balance: newBalance
    }, {
      where: {
        id: accountId
      },
      transaction: t
    });
  },

  getAccountFromAccountTransaction: function(accountTransaction, t) {
    console.log("accountTransaction[0][0]: ", accountTransaction);
    return Account.findById(accountTransaction[0][0].dataValues.accountId, {transaction: t});
  }
}

module.exports = TransactionService;
