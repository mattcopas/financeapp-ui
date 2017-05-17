var financeApp = angular.module('financeApp', [
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute',
  'smart-table',
  'mwl.confirm',
  'angular-logger',
  'isoCurrency'
]);

financeApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/static/app/home/home.html',
    controller: 'homeController'
  })
});
