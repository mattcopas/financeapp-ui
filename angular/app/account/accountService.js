financeApp.service('accountService', ['$http', function($http) {

  this.getAccountsByUserId = function(userId) {
    return $http({
      method: 'GET',
      url: appConfig.urls.api + 'accounts?id=' + userId
    })
  };

}]);
