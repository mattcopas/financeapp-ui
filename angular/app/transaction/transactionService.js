financeApp.service('transactionService', [
  '$http',
  '$log',
  'ENV',
  function($http, $log, ENV) {

    var logger = $log.getInstance('transactionService');

    this.getTransactionsByAccountId = function(accountId) {
      return $http({
        method: 'GET',
        url: ENV.API_URL + 'accounts/' + accountId + '/transactionList'
      });
    };

    this.getTransactions = function(userId) {
      return $http({
        method: 'GET',
        url: ENV.API_URL + 'transactions?projection=includeAccount'
      })
    };

    this.postCreateTransactionData = function(transactionData) {
      logger.info("Transaction data to send ", transactionData);
      return $http({
        method: 'POST',
        url: ENV.API_URL + 'transaction/add',
        data: transactionData
      });
    };

    this.parseRawTransactionsData = function(rawTransactionsData) {
      return rawTransactionsData._embedded.transactions;
    };

    this.rollbackTransaction = function(transactionId) {
      return $http({
        method: 'POST',
          url: ENV.API_URL + "transaction/rollback/" + transactionId
      });
    }

  }

]);
