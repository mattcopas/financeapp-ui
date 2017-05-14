var financeApp = angular.module('financeApp', [
  'ngSanitize',
  'ui.bootstrap',
  'ngRoute',
  'smart-table',
  'mwl.confirm',
  'angular-logger'
]);

financeApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/static/app/home/home.html',
    controller: 'homeController'
  })
});
