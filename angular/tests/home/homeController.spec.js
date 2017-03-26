'use strict';

var homeController;
var scope;
var accountService;
var mockAccountsResponse;
var $httpBackend;

describe('The home controller', function() {

  beforeEach(function() {

    module('financeApp');

    scope = {};

    inject(function($injector, $controller) {
      $httpBackend = $injector.get('$httpBackend');
      accountService = $injector.get('accountService');
      spyOn(accountService, 'getAccountsByUserId').and.callThrough();

      mockAccountsResponse = $httpBackend.when('GET', 'http://localhost:8000/api/accounts?id=1');
      mockAccountsResponse.respond(200, {});

      homeController = $controller('homeController', {'$scope':scope});
    });

  });

  it('should call the accountService to get accounts data', function() {
    expect(accountService.getAccountsByUserId).toHaveBeenCalled();
  });

  it('should assign the accounts for a user to $scope', function() {
    expect(scope.accounts).toBeDefined();
  });

});
