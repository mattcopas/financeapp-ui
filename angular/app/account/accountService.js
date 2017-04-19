financeApp.service('accountService', ['$http', function($http) {

  this.getAccountsByUserId = function(userId) {
    return $http({
      method: 'GET',
      url: appConfig.urls.api + 'accounts?id=' + userId
    })
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

  this.postCreateAccountData = function(accountData) {
    return $http({
      method: 'POST',
      url: appConfig.urls.api + 'account/save',
      data: {
        account: accountData
      }
    })
  };

  this.deleteAccountById = function(accountId) {
    return $http({
      method: 'DELETE',
      url: appConfig.urls.api + 'account/delete?id=' + accountId
    })
  };

}]);
