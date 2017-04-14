var financeApp = angular.module('financeApp', ['ui.bootstrap', 'ngRoute', 'smart-table']);

financeApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/static/app/home/home.html',
    controller: 'homeController'
  })
});
