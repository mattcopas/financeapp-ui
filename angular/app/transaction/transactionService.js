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

  }
]);
