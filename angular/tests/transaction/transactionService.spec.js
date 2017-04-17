'use strict';

var transactionService;
var $httpBackend;
var mockGetTransactionsRequest;

describe('The Transaction Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {
      transactionService = $injector.get('transactionService');
      $httpBackend = $injector.get('$httpBackend');

    });

  });

  afterEach(function() {
    $httpBackend.flush();
  });

  it('should call the backend api to save a transaction', function() {

    var transactionData = {
      name: 'Test Transaction',
      amount: 100.00,
      type: 'Income'
    };

    mockGetTransactionsRequest = $httpBackend.expect('POST', 'http://localhost:3000/api/transaction/save');
    mockGetTransactionsRequest.respond(200, 'Transaction saved');

    transactionService.postCreateTransactionData(transactionData, 3)
      .then(function success(response) {
        expect(response.data).toBe('Transaction saved');
        expect(response.status).toBe(200);
      }, function error(response) {
        console.log("Error in test: ", error);
      });
  });

});
