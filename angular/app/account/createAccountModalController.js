financeApp.controller('createAccountModalController', [
  '$scope',
  'accountService',
function($scope, accountService) {

  $scope.account = {};

  $scope.submitCreateAccountForm = function() {
    accountService.postCreateAccountData($scope.account);
    $scope.modalInstance.close();
  };
}]);
