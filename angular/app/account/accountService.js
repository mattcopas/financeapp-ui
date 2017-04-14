financeApp.service('accountService', ['$http', function($http) {

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
      data: accountData
    })
  };

}]);
