financeApp.controller('homeController', [
  'accountService',
  '$scope',
  '$uibModal',
  function(accountService, $scope, $uibModal) {

  $scope.accounts = [];

  $scope.getAccounts = function() {accountService.getAccountsByUserId(1).then(function success(response) {
    $scope.accounts = response.data;
    }, function errorCallBack(response) {
      console.log("Error getting data: ", response.data);
    });
  };

  $scope.openCreateAccountModal = function() {
    $scope.modalInstance = $uibModal.open({
      windowTemplateUrl: '/static/node_modules/angular-ui-bootstrap/template/modal/window.html',
      templateUrl: '/static/app/account/createAccountModal.html',
      controller: 'createAccountModalController',
      scope: $scope
    });

    $scope.modalInstance.closed.then(function() {
      $scope.getAccounts();
    });
  };

  $scope.openCreateTransactionModal = function() {
    $scope.modalInstance = $uibModal.open({
      windowTemplateUrl: '/static/node_modules/angular-ui-bootstrap/template/modal/window.html',
      templateUrl: '/static/app/transaction/createTransactionModal.html',
      controller: 'createTransactionModalController',
      scope: $scope
    });

    $scope.modalInstance.closed.then(function() {
      $scope.getAccounts();
    });
  }

  $scope.deleteAccount = function(accountId) {
    console.log("Running $scope.deleteAccount");
    accountService.deleteAccountById(accountId).then(function success(response) {
      console.log("Inside then block");
      $scope.getAccounts();
    }, function errorCallBack(response) {
      console.log(response);

    });

    $scope.getAccounts();

  };

  $scope.getAccounts();

}]);
