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
      mockGetTransactionsRequest = $httpBackend.expect('GET', 'http://localhost:8081/accounts/1/transactionList');
      mockGetTransactionsRequest.respond(mockTransactionsData);
    })

    it('should give a transaction name', function() {
      transactionService.getTransactionsByAccountId(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].name).toBe('Test Transaction 1');
      });
      $httpBackend.flush();
    });

    it('should give a transaction type', function() {
      transactionService.getTransactionsByAccountId(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].type).toBe('Income');
      });
      $httpBackend.flush();
    });

    it('should give a transaction amount', function() {
      transactionService.getTransactionsByAccountId(1).then(function(response) {
        var parsedTransactionsData = transactionService.parseRawTransactionsData(response.data);
        expect(parsedTransactionsData[0].amount).toBe(50);
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
        console.log("Inside then block");
        expect(response.data).toBe('Transaction saved');
        expect(response.status).toBe(200);
      });
    });
  });

  // describe('Parsing transaction data', function() {
  //
  //   beforeEach(function() {
  //     parsedTransactionData = transactionService.parseTransactionData(mockAccountsData);
  //   });
  //
  //   it('should give an array of transactions', function() {
  //     expect(parsedTransactionData.length).toBe(2);
  //   });
  //
  //   describe('A parsed transaction', function() {
  //
  //     it('should have a name', function() {
  //       expect(parsedTransactionData[0].name).toBe("First Transaction");
  //       expect(parsedTransactionData[1].name).toBe("Second Transaction");
  //     });
  //
  //     it('should have an account name', function() {
  //       expect(parsedTransactionData[0].accountName).toBe("Account 1");
  //       expect(parsedTransactionData[1].accountName).toBe("Account 1");
  //     });
  //
  //     it('should have a type', function() {
  //       expect(parsedTransactionData[0].type).toBe("Expense");
  //       expect(parsedTransactionData[1].type).toBe("Income");
  //     });
  //
  //     it('should have an amount', function() {
  //       expect(parsedTransactionData[0].amount).toBe(145);
  //       expect(parsedTransactionData[1].amount).toBe(120);
  //     });
  //
  //     it('should have a date', function() {
  //       expect(parsedTransactionData[0].date).toBe("2017-04-17T13:26:50.281Z");
  //       expect(parsedTransactionData[1].date).toBe("2017-04-18T14:26:50.281Z");
  //     });
  //
  //   });
  //
  // });


});
