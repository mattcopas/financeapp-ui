financeApp.service('accountService', ['ENV', '$http', function(ENV, $http) {

  this.getAccountsByUserId = function(userId) {
    return $http({
      method: 'GET',
      url: ENV.API_URL + 'accounts'
    })
  };

  this.postCreateAccountData = function(accountData) {
    return $http({
      method: 'POST',
      url: ENV.API_URL + 'accounts',
      data: accountData
    })
  };

  this.deleteAccountById = function(accountId) {
    return $http({
      method: 'DELETE',
      url: ENV.API_URL + 'accounts/' + accountId
    })
  };

  this.parseAccountsData = function(rawAccountsData) {
    var parsedAccountsData = [];
    parsedAccountsData = rawAccountsData._embedded.accounts;
    return parsedAccountsData;
  }

}]);
