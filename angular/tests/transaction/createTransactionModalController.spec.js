'use strict';

var scope;
var createTransactionModalController;
var transactionService;

describe('The Create Transaction Modal Contrller', function() {

  beforeEach(function() {
    module('financeApp');

    scope = {account: {}};

    inject(function($injector, $controller) {
      transactionService = $injector.get('transactionService');
      createTransactionModalController = $controller('createTransactionModalController', {'$scope': scope})
      spyOn(transactionService, 'postCreateTransactionData').and.callThrough();
    });
  });

  it('should assign an account to scope', function() {
    expect(scope.account).toBeDefined();
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
      .toHaveBeenCalledWith(scope.transaction, accountId);
  });

});
