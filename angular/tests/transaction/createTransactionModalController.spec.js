'use strict';

var scope;
var createTransactionModalController;
var transactionService;
var deferred;
var q;
var rootScope;

describe('The Create Transaction Modal Contrller', function() {

  beforeEach(function() {
    module('financeApp');

    inject(function($injector, $controller) {
      rootScope = $injector.get('$rootScope');
      q = $injector.get('$q');
      transactionService = $injector.get('transactionService');

      deferred = q.defer();

      spyOn(transactionService, 'postCreateTransactionData').and.returnValue(deferred.promise);

      scope = rootScope.$new();
      scope.modalInstance = {
        close: function() {}
      }

      createTransactionModalController = $controller('createTransactionModalController', {$scope: scope});

    });
  });

  it('should assign a transaction to scope', function() {
    expect(scope.transaction).toBeDefined();
  });

  it('should call the transactionService to post a transaction', function() {
    scope.transaction = {
      type: 'Expense',
      amount: '2456.00',
      name: 'Test Transactions'
    };
    var accountId = 1;
    scope.submitAddTransactionForm(accountId);
    expect(transactionService.postCreateTransactionData)
      .toHaveBeenCalledWith(scope.transaction);
  });

  it('should call the modalInstance.close function when am account is posted successfully', function() {

    spyOn(scope.modalInstance, 'close');
    scope.submitAddTransactionForm(1);
    deferred.resolve({});
    scope.$apply();
    expect(scope.modalInstance.close).toHaveBeenCalled();
  });

});
