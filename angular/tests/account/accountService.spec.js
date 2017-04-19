'use strict';

var accountService;
var $httpBackend;
var accountsRequestHandler;
var mockAccountsData;
var returnedAccountsData;
var postAccountRequestHandler;
var deleteAccountRequestHandler;
var parsedTransactionData;

describe('The Account Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {
      accountService = $injector.get('accountService');
      $httpBackend = $injector.get('$httpBackend');
    });

    mockAccountsData = readJSON('tests/fixtures/accounts.json');

  });

  describe('Accounts', function() {

    beforeEach(function() {
      accountsRequestHandler = $httpBackend.expect('GET', 'http://localhost:3000/api/accounts?id=1');
      accountsRequestHandler.respond(mockAccountsData);
    });

    it('should be an array of accounts', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(angular.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBe(1);
      });

      $httpBackend.flush();
    });

    it('should have an account name', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].name).toBe('Account 1');
      });

      $httpBackend.flush();
    });

    it('should have an account type', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].name).toBe('Account 1');
      });

      $httpBackend.flush();
    });

    it('should have an account balance', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].balance).toBe('100.00');
      });

      $httpBackend.flush();
    });

    it('should have an account currency', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].currency).toBe('GBP');
      });

      $httpBackend.flush();
    });

    it('should have an array of transactions', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(angular.isArray(response.data[0].transactions)).toBeTruthy();
      });

      $httpBackend.flush();

    });

    describe('Parsing transaction data', function() {

      beforeEach(function() {
        parsedTransactionData = accountService.parseTransactionData(mockAccountsData);
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

  describe('The post account function', function() {
    beforeEach(function() {
      postAccountRequestHandler = $httpBackend.expect('POST', 'http://localhost:3000/api/account/save');
      postAccountRequestHandler.respond(200, 'Account added');
    });

    it('should send a post request to the backend api', function() {
      accountService.postCreateAccountData({
        name: 'Test Account',
        balance: '100',
        currency: 'USD',
        type: 'Cash'
      }).then(function(response) {
        expect(response.status).toBe(200);
        expect(response.data).toBe('Account added');
      });

      $httpBackend.flush();

    });
  });

  describe('The remove account function', function() {
    beforeEach(function() {
      deleteAccountRequestHandler = $httpBackend.expect('DELETE', 'http://localhost:3000/api/account/delete?id=123');
      deleteAccountRequestHandler.respond(200, 'Account deleted');
    });

    it('should send a delete request to the backend api', function() {
      accountService.deleteAccountById(123).then(function(response) {
        expect(response.status).toBe(200);
        expect(response.data).toBe('Account deleted');
        $httpBackend.flush();
      });

    });
  });

});
