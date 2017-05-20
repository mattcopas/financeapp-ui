financeApp.service('transactionService', [
  '$http',
  function($http) {

    this.getTransactionsByAccountId = function(accountId) {
      return $http({
        method: 'GET',
        url: appConfig.urls.api + 'accounts/' + accountId + '/transactionList'
      });
    };

    this.postCreateTransactionData = function(transactionData) {
      console.log("Inside postCreateTransactionData");
      return $http({
        method: 'POST',
        url: appConfig.urls.api + 'transaction/add',
        data: transactionData
      });
    };

    this.parseRawTransactionsData = function(rawTransactionsData) {
      return rawTransactionsData._embedded.transactions;
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
            currency: account.currency,
            date: transaction.createdAt
          };

          transactions.push(parsedTransaction);

        });

      });

      return transactions;

    };

  }

]);
