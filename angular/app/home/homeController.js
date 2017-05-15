financeApp.controller('homeController', [
  'accountService',
  'transactionService',
  '$scope',
  '$uibModal',
  '$log',
  function(accountService, transactionService, $scope, $uibModal, $log) {

  var logger = $log.getInstance('homeController');

  $scope.accounts = [];
  $scope.transactions = [];

  $scope.getAccounts = function() {
    accountService.getAccountsByUserId(1).then(function success(response) {
      $scope.accounts = accountService.parseAccountsData(response.data);
      $scope.transactions = transactionService.parseTransactionData($scope.accounts);
    }, function errorCallBack(response) {
      logger.error("Error getting data: ", response.data);
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

  $scope.openCreateTransactionModal = function(account) {
    $scope.account = account;
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
    logger.info("Running $scope.deleteAccount");
    accountService.deleteAccountById(accountId).then(function success(response) {
      logger.info5("Inside then block");
      $scope.getAccounts();
    }, function errorCallBack(response) {
      logger.error(response);

    });

    $scope.getAccounts();

  };

  $scope.getAccounts();

}]);