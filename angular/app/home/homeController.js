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
      console.log("Returned data in controller after api call: ", response.data);
      $scope.accounts = accountService.parseAccountsData(response.data);
      transactionService.getTransactions(1).then(function(response) {
        logger.info("rawTransactionsData ", response.data);
        $scope.transactions = transactionService.parseRawTransactionsData(response.data);
      })
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
      logger.info("Inside then block");
      $scope.getAccounts();
    }, function errorCallBack(response) {
      logger.error(response);

    });

    $scope.getAccounts();

  };

  $scope.getAccounts();

}]);
