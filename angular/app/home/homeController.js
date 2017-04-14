financeApp.controller('homeController', [
  'accountService',
  '$scope',
  '$rootScope',
  '$uibModal',
  function(accountService, $scope, $rootScope, $uibModal) {

  $scope.accounts = [];

  accountService.getAccountsByUserId(1).then(function success(response) {
    $scope.accounts = response.data;
    console.log("$scope.accounts ", $scope.accounts);
  }, function errorCallBack(response) {
    console.log("Error getting data: ", response.data);
  });

  $scope.openCreateAccountModal = function() {
    var modalInstance = $uibModal.open({
      windowTemplateUrl: '/static/node_modules/angular-ui-bootstrap/template/modal/window.html',
      templateUrl: '/static/app/account/createAccountModal.html',
      controller: 'createAccountModalController'
    });
  };

}]);
