'use strict';

var accountService;
var $httpBackend;
var accountsRequestHandler;
var mockAccountsData;
var returnedAccountsData;
var postAccountRequestHandler;
var deleteAccountRequestHandler;
var parsedTransactionData;
var ENV;

describe('The Account Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {
      ENV = $injector.get('ENV');
      accountService = $injector.get('accountService');
      $httpBackend = $injector.get('$httpBackend');
    });

    mockAccountsData = readJSON('tests/fixtures/accounts.json');

  });

  describe('Accounts', function() {

    beforeEach(function() {
      accountsRequestHandler = $httpBackend.expect('GET', ENV.API_URL + 'accounts');
      accountsRequestHandler.respond(mockAccountsData);
    });

    it('should be an array of accounts', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        var parsedAccountsData = accountService.parseAccountsData(response.data);
        expect(angular.isArray(parsedAccountsData)).toBeTruthy();
        expect(parsedAccountsData.length).toBe(4);
      });

      $httpBackend.flush();
    });

    it('should have an account name', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        var parsedAccountsData = accountService.parseAccountsData(response.data);
        expect(parsedAccountsData[0].name).toBe('Test Account 1');
      });

      $httpBackend.flush();
    });

    // TODO Account Type
    it('should have an account type', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        var parsedAccountsData = accountService.parseAccountsData(response.data);
        expect(parsedAccountsData[0].type).toBe('Current');
      });

      $httpBackend.flush();
    });

    it('should have an account balance', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        var parsedAccountsData = accountService.parseAccountsData(response.data);
        expect(parsedAccountsData[0].balance).toBe(100);
      });

      $httpBackend.flush();
    });

    it('should have an account currency', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        var parsedAccountsData = accountService.parseAccountsData(response.data);
        expect(parsedAccountsData[0].currency).toBe('USD');
      });

      $httpBackend.flush();
    });

  });

  describe('The post account function', function() {
    beforeEach(function() {
      postAccountRequestHandler = $httpBackend.expect('POST', ENV.API_URL + 'accounts');
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
      deleteAccountRequestHandler = $httpBackend.expect('DELETE', ENV.API_URL  + 'accounts/123');
      deleteAccountRequestHandler.respond(200, 'Account deleted');
    });

    it('should send a delete request to the backend api', function() {
      accountService.deleteAccountById(123).then(function(response) {
        expect(response.status).toBe(200);
        expect(response.data).toBe('Account deleted');
      });
      $httpBackend.flush();
    });
  });

});
