financeApp.service('accountService', ['$http', function($http) {

  this.getAccountsByUserId = function(userId) {
    return $http({
      method: 'GET',
      url: appConfig.urls.api + 'accounts'
    })
  };

  this.postCreateAccountData = function(accountData) {
    return $http({
      method: 'POST',
      url: appConfig.urls.api + 'accounts',
      data: {
        account: accountData
      }
    })
  };

  this.deleteAccountById = function(accountId) {
    return $http({
      method: 'DELETE',
      url: appConfig.urls.api + 'accounts'
    })
  };

  this.parseAccountsData = function(rawAccountsData) {
    var parsedAccountsData = [];
    parsedAccountsData = rawAccountsData._embedded.accounts;
    return parsedAccountsData;
  }

}]);
