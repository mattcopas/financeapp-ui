'use strict';

var transactionService;
var $httpBackend;
var mockGetTransactionsRequest;
var mockPostTransactionsRequest;
var mockAccountsData;
var mockTransactionsData;
var ENV;
var mockRollbackTransactionRequest;


describe('The Transaction Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {

      ENV = $injector.get('ENV');
      transactionService = $injector.get('transactionService');
      $httpBackend = $injector.get('$httpBackend');

    });

    mockTransactionsData = readJSON('tests/fixtures/transactions.json');
    mockAccountsData = readJSON('tests/fixtures/accounts.json');

  });

  describe('Getting transaction data by account id', function() {
    beforeEach(function() {
      mockGetTransactionsRequest = $httpBackend.expect('GET', ENV.API_URL + 'accounts/1/transactionList');
      mockGetTransactionsRequest.respond(mockTransactionsData);
    });

    it('should give a transaction name', function () {
      transactionService.getTransactionsByAccountId(1).then(function(response) {
        expect(response.data._embedded).toBeDefined();
      })
    });
  });

  describe('Getting transactions data by user id', function() {

    beforeEach(function() {
      mockGetTransactionsRequest = $httpBackend.expect('GET', + ENV.API_URL + 'transactions?projection=includeAccount');
      mockGetTransactionsRequest.respond(mockTransactionsData);
    });

    it('should get transaction data by user id from the api', function() {
      transactionService.getTransactions(1).then(function() {
        expect(response.data._embedded).toBeDefined();
      });
    })

  });

  describe('Parsing transaction data', function() {

    it('should give a transaction name', function() {
      var parsedTransactionsData = transactionService.parseRawTransactionsData(mockTransactionsData);
      expect(parsedTransactionsData[0].name).toBe('Test Transaction 1');
    });

    it('should give a transaction type', function() {
      var parsedTransactionsData = transactionService.parseRawTransactionsData(mockTransactionsData);
      expect(parsedTransactionsData[0].type).toBe('Income');
    });

    it('should give a transaction amount', function() {
      var parsedTransactionsData = transactionService.parseRawTransactionsData(mockTransactionsData);
      expect(parsedTransactionsData[0].amount).toBe(50);
    });

    it('should have an account name', function() {
      var parsedTransactionsData = transactionService.parseRawTransactionsData(mockTransactionsData);
      expect(parsedTransactionsData[0].account.name).toBe('Test Account 1');
    });
  });

  describe('Posting transaction data', function() {

    beforeEach(function() {
      mockPostTransactionsRequest = $httpBackend.expect('POST', ENV.API_URL + 'transaction/add');
      mockPostTransactionsRequest.respond(200, 'Transaction saved');
    });

    it('should call the backend api to save a transaction', function() {

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
      $httpBackend.flush();
    });
  });

  describe('Rolling back a transaction', function() {

      beforeEach(function() {
        mockRollbackTransactionRequest = $httpBackend.expect('POST', ENV.API_URL + "transaction/rollback/1");
        mockRollbackTransactionRequest.respond(200);
      });

      it('should call the API to roll back a transaction', function() {
        transactionService.rollbackTransaction(1).then(function success(response) {
          expect(response.data).toBe(200);
        });
      });

  });

});
