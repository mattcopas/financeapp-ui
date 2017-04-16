var TransactionService = {

  addTransaction: function(transaction) {
    console.log("SAVING TRANSACTION");
    return transaction.save();
  }
}

module.exports = TransactionService;
