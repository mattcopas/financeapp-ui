financeApp.controller('createTransactionModalController', [
  'transactionService',
  '$scope',
  function(transactionService, $scope) {

    $scope.transaction = {};

    $scope.submitAddTransactionForm = function(accountId) {

      transactionService.postCreateTransactionData($scope.transaction, accountId)
        .then(function success(response) {
          $scope.modalInstance.close();
        });

    };
}]);
