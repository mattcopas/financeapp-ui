financeApp.controller('homeController', ['accountService', '$scope', '$rootScope', function(accountService, $scope, $rootScope) {

  $scope.accounts = [];

  accountService.getAccountsByUserId(1).then(function success(response) {
    $scope.accounts = response.data;
  }, function errorCallBack(response) {

  });

}]);
