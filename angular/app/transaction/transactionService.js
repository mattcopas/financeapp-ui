financeApp.service('transactionService', [
  '$http',
  function($http) {

    this.postCreateTransactionData = function(transactionData, accountId) {
      return $http({
        method: 'POST',
        url: appConfig.urls.api + 'transaction/save',
        data: {
          transaction: transactionData,
          accountId: accountId
        }
      });
    };

    this.parseTransactionData = function(accounts) {
      var transactions = [];

      angular.forEach(accounts, function(account, key) {

        angular.forEach(account.transactions, function(transaction, key) {
          var parsedTransaction = {
            name: transaction.name,
            accountName: account.name,
            type: transaction.type,
            amount: transaction.amount,
            date: transaction.createdAt
          };

          transactions.push(parsedTransaction);

        });

      });

      return transactions;
      
    };

  }

]);
