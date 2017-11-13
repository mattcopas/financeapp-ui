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
var deferredGetAccountsPromise;
var deferredGetTransactionsPromise;
var deferredDeleteAccountPromise;
var rootScope;
var mockResponseObject;
var mockErrorObject;
var deferredRollbackTransactionPromise;

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

      deferredGetAccountsPromise = q.defer();
      deferredGetTransactionsPromise = q.defer();
      deferredDeleteAccountPromise = q.defer();
      deferredRollbackTransactionPromise = q.defer();

      spyOn(accountService, 'getAccountsByUserId').and.returnValue(deferredGetAccountsPromise.promise);
      spyOn(accountService, 'deleteAccountById').and.returnValue(deferredDeleteAccountPromise.promise);
      spyOn(accountService, 'parseAccountsData').and.returnValue({});
      spyOn(transactionService, 'parseRawTransactionsData').and.returnValue({});
      spyOn(transactionService, 'getTransactions').and.returnValue(deferredGetTransactionsPromise.promise);
      spyOn(transactionService, 'rollbackTransaction').and.returnValue(deferredRollbackTransactionPromise.promise);
      spyOn(uibModal, 'open').and.callThrough();


      mockResponseObject = {
        data: {}
      }

      mockErrorObject = {
        data: {}
      }

      homeController = $controller('homeController', {
        $scope:scope
      });
    });

  });

  it('should assign accounts to scope', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.accounts).toBeDefined();
  });

  it('should assign error to scope if the account request fails', function() {
    deferredGetAccountsPromise.reject(mockErrorObject);
    scope.$apply();
    expect(scope.error).toBe('There was a problem when retrieving data');
  })

  it('should assign transactions to scope', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    deferredGetTransactionsPromise.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.transactions).toBeDefined();
  });

  it('should assign error to scope if the transactions request fails', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    deferredGetTransactionsPromise.reject(mockErrorObject);
    scope.$apply();
    expect(scope.error).toBe('There was a problem when retrieving data');
  });

  //
  // // TODO Test accountService.parseTransactionData has been called with scope.accounts
  //
  it('should call the accountService to get accounts data', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    scope.$apply();
    expect(accountService.getAccountsByUserId).toHaveBeenCalled();
  });

  it('should call scope.getAccounts after removing an account', function() {
    spyOn(scope, 'getAccounts');
    scope.deleteAccount('123');
    deferredDeleteAccountPromise.resolve(mockResponseObject);
    scope.$apply();
    expect(scope.getAccounts).toHaveBeenCalled();
  });

  it('should assign an error to scope if deleting an account fails', function() {
    scope.deleteAccount('123');
    deferredDeleteAccountPromise.reject(mockErrorObject);
    scope.$apply();
    expect(scope.error).toBe("There was a problem deleting an account");
  });

  it('should call $uibModal.open to open the createAccountModal', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    scope.$apply();
    scope.openCreateAccountModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

  it('should call $uibModal.open to open the createTransactionModal', function() {
    deferredGetAccountsPromise.resolve(mockResponseObject);
    scope.$apply();
    scope.openCreateTransactionModal();
    expect(uibModal.open).toHaveBeenCalled();
  });

  it('should call the transacionService to rollback a transaction', function() {
    deferredRollbackTransactionPromise.resolve(mockResponseObject);
    scope.$apply();
    scope.rollbackTransaction(1);
    expect(transactionService.rollbackTransaction).toHaveBeenCalledWith(1);
  });

});
