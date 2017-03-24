var financeApp = angular.module('financeApp', []);

financeApp.service('testService', [function() {

this.testServiceFunction = function(a) {
  return a;
}

}]);
