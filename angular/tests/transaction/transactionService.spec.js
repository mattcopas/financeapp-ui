'use strict';

var transactionService;
var $httpBackend;
var mockGetTransactionsRequest;
var mockAccountsData;
var parsedTransactionData;

describe('The Transaction Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {

      transactionService = $injector.get('transactionService');
      $httpBackend = $injector.get('$httpBackend');

    });

      mockAccountsData = readJSON('tests/fixtures/accounts.json');

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

      $httpBackend.flush();
  });

  describe('Parsing transaction data', function() {

    beforeEach(function() {
      parsedTransactionData = transactionService.parseTransactionData(mockAccountsData);
    });

    it('should give an array of transactions', function() {
      expect(parsedTransactionData.length).toBe(2);
    });

    describe('A parsed transaction', function() {

      it('should have a name', function() {
        expect(parsedTransactionData[0].name).toBe("First Transaction");
        expect(parsedTransactionData[1].name).toBe("Second Transaction");
      });

      it('should have an account name', function() {
        expect(parsedTransactionData[0].accountName).toBe("Account 1");
        expect(parsedTransactionData[1].accountName).toBe("Account 1");
      });

      it('should have a type', function() {
        expect(parsedTransactionData[0].type).toBe("Expense");
        expect(parsedTransactionData[1].type).toBe("Income");
      });

      it('should have an amount', function() {
        expect(parsedTransactionData[0].amount).toBe(145);
        expect(parsedTransactionData[1].amount).toBe(120);
      });

      it('should have a date', function() {
        expect(parsedTransactionData[0].date).toBe("2017-04-17T13:26:50.281Z");
        expect(parsedTransactionData[1].date).toBe("2017-04-18T14:26:50.281Z");
      });

    });

  });


});
