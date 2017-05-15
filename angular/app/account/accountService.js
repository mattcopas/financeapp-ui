financeApp.service('accountService', ['$http', 'currencyService', function($http, currencyService) {

  this.getAccountsByUserId = function(userId) {
    return $http({
      method: 'GET',
      url: appConfig.urls.api + 'accounts?id=' + userId
    })
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

  this.parseAccountsData = function(accounts) {
    angular.forEach(accounts, function(account, key) {
      account.currency = currencyService.convertCurrencyToSymbol(account.currency);
    });

    return accounts;
  };

}]);
