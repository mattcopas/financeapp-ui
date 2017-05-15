'use strict';

var homeController;
var scope;
var accountService;
var transactionService;
var mockAccountsResponse;
var $httpBackend;
var uibModal;
var currencyService;

describe('The home controller', function() {

  beforeEach(function() {

    module('financeApp');


    scope = {};

    inject(function($injector, $controller) {
      $httpBackend = $injector.get('$httpBackend');
      accountService = $injector.get('accountService');
      transactionService = $injector.get('transactionService');
      currencyService = $injector.get('currencyService');
      uibModal = $injector.get('$uibModal');
      spyOn(accountService, 'getAccountsByUserId').and.callThrough();
      spyOn(accountService, 'deleteAccountById').and.callThrough();
      spyOn(accountService, 'parseAccountsData').and.callThrough();
      spyOn(transactionService, 'parseTransactionData').and.callThrough();
      spyOn(uibModal, 'open').and.callThrough();

      mockAccountsResponse = $httpBackend.when('GET', 'http://localhost:8000/api/accounts?id=1');
      mockAccountsResponse.respond(200, {});

      homeController = $controller('homeController', {'$scope':scope});
    });

  });

  it('should assign transactions to scope', function() {
    expect(scope.transactions).toBeDefined();
  });

  // TODO Test accountService.parseTransactionData has been called with scope.accounts

  // TODO Test accountService.parseAccountsData has been called with scope.accounts

  it('should call the accountService to get accounts data', function() {
    expect(accountService.getAccountsByUserId).toHaveBeenCalled();
  });

  it('should call the accountService to remove an account', function() {
    scope.deleteAccount('123');
    expect(accountService.deleteAccountById).toHaveBeenCalledWith('123');
  });

  it('should assign the accounts for a user to $scope', function() {
    expect(scope.accounts).toBeDefined();
  });

  it('should call $uibModal.open to open the createAccountModal', function() {
    scope.openCreateAccountModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

  it('should call $uibModal.open to open the createTransactionModal', function() {
    scope.openCreateTransactionModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

});
