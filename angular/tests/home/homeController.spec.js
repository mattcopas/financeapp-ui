'use strict';

var homeController;
var scope;
var accountService;
var transactionService;
var mockAccountsRequest;
var $httpBackend;
var uibModal;
var mockAccountsData;
var q;
var deferred;
var rootScope;
var mockResponseObject;


describe('The home controller', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector, $controller) {
      $httpBackend = $injector.get('$httpBackend');
      accountService = $injector.get('accountService');
      transactionService = $injector.get('transactionService');2
      uibModal = $injector.get('$uibModal');
      q = $injector.get('$q');
      rootScope = $injector.get('$rootScope');

      scope = rootScope.$new();

      deferred = q.defer();

      spyOn(accountService, 'getAccountsByUserId').and.returnValue(deferred.promise);
      spyOn(accountService, 'deleteAccountById').and.returnValue(deferred.promise);
      spyOn(accountService, 'parseAccountsData').and.returnValue({});
      spyOn(transactionService, 'parseRawTransactionsData').and.returnValue({});
      spyOn(transactionService, 'getTransactions').and.returnValue(deferred.promise);
      spyOn(uibModal, 'open').and.callThrough();


      mockResponseObject = {
        data: {}
      }

      homeController = $controller('homeController', {
        $scope:scope
      });
    });

  });

  it('should assign accounts to scope', function() {
    deferred.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.accounts).toBeDefined();
  });

  it('should assign transactions to scope', function() {
    deferred.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.transactions).toBeDefined();
  });
  //
  // // TODO Test accountService.parseTransactionData has been called with scope.accounts
  //
  it('should call the accountService to get accounts data', function() {
    deferred.resolve(mockResponseObject);
    scope.$apply();
    expect(accountService.getAccountsByUserId).toHaveBeenCalled();
  });

  it('should call scope.getAccounts after removing an account', function() {
    spyOn(scope, 'getAccounts');
    scope.deleteAccount('123');
    deferred.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.getAccounts).toHaveBeenCalled();
  });

  it('should call $uibModal.open to open the createAccountModal', function() {
    deferred.resolve(mockResponseObject);
    scope.$apply();
    scope.openCreateAccountModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

  it('should call $uibModal.open to open the createTransactionModal', function() {
    deferred.resolve(mockResponseObject);
    scope.$apply();
    scope.openCreateTransactionModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

});
