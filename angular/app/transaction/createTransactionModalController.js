financeApp.controller('createTransactionModalController', [
  'transactionService',
  '$scope',
  function(transactionService, $scope) {

    $scope.transaction = {};

    $scope.submitAddTransactionForm = function(accountId) {

      $scope.transaction.accountId = accountId;
      transactionService.postCreateTransactionData($scope.transaction)
        .then(function success(response) {
          $scope.modalInstance.close();
        });

    };
}]);
