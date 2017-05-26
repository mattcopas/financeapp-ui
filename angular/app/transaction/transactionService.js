financeApp.service('transactionService', [
  '$http',
  '$log',
  function($http, $log) {

    var logger = $log.getInstance('transactionService');

    this.getTransactionsByAccountId = function(accountId) {
      return $http({
        method: 'GET',
        url: appConfig.urls.api + 'accounts/' + accountId + '/transactionList'
      });
    };

    this.getTransactions = function(userId) {
      return $http({
        method: 'GET',
        url: appConfig.urls.api + 'transactions?projection=includeAccount'
      })
    };

    this.postCreateTransactionData = function(transactionData) {
      logger.info("Transaction data to send ", transactionData);
      return $http({
        method: 'POST',
        url: appConfig.urls.api + 'transaction/add',
        data: transactionData
      });
    };

    this.parseRawTransactionsData = function(rawTransactionsData) {
      return rawTransactionsData._embedded.transactions;
    };

  }

]);
