financeApp.controller('createAccountModalController', [
  '$scope',
  'accountService',
function($scope, accountService) {
  $scope.submitCreateAccountForm = function() {
    console.log("Form submitted:");
  };
}]);
