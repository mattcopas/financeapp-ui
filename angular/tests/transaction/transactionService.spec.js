'use strict';

var transactionService;
var $httpBackend;
var mockGetTransactionsRequest;
var mockPostTransactionsRequest;
var mockAccountsData;
var mockTransactionsData;
var parsedTransactionData;

describe('The Transaction Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {

      transactionService = $injector.get('transactionService');
      $httpBackend = $injector.get('$httpBackend');

    });

    mockTransactionsData = readJSON('tests/fixtures/transactions.json');
    mockAccountsData = readJSON('tests/fixtures/accounts.json');

  });

  describe('Getting transactions data', function() {

    beforeEach(function() {
      mockGetTransactionsRequest = $httpBackend.expect('GET', 'http://localhost:8081/transactions?projection=includeAccount');
      mockGetTransactionsRequest.respond(mockTransactionsData);
    })

    it('should give a transaction name', function() {
      transactionService.getTransactions(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].name).toBe('Test Transaction 1');
      });
      $httpBackend.flush();
    });

    it('should give a transaction type', function() {
      transactionService.getTransactions(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].type).toBe('Income');
      });
      $httpBackend.flush();
    });

    it('should give a transaction amount', function() {
      transactionService.getTransactions(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].amount).toBe(50);
      });
      $httpBackend.flush();
    });

    it('should have an account name', function() {
      transactionService.getTransactions(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].account.name).toBe('Test Account 1');
      });
      $httpBackend.flush();
    });

  });

  describe('Posting transaction data', function() {

    it('should call the backend api to save a transaction', function() {
      // TODO This test is not making the required post request
      mockPostTransactionsRequest = $httpBackend.expect('POST', 'http://localhost:8081/transaction/add');
      mockPostTransactionsRequest.respond(200, 'Transaction saved');

      var transactionData = {
        name: 'Test Transaction To Add',
        amount: 100.00,
        type: 'Income',
        accountId: 3
      };

      transactionService.postCreateTransactionData(transactionData).then(function(response) {
        expect(response.data).toBe('Transaction saved');
        expect(response.status).toBe(200);
      });
    });
  });

});
