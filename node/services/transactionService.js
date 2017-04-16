var TransactionService = {

  addTransaction: function(transaction) {
    return transaction.save();
  }
}

module.exports = TransactionService;
