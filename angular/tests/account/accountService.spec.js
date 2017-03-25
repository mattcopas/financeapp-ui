'use strict';

var accountService;
var $httpBackend;
var accountsRequestHandler;
var mockAccountsData;
var returnedAccountsData;

describe('The Account Service', function() {

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {
      accountService = $injector.get('accountService');
      $httpBackend = $injector.get('$httpBackend');
    });

    accountsRequestHandler = $httpBackend.when('GET', 'http://localhost:8000/api/accounts?userId=1');

    mockAccountsData = readJSON('tests/fixtures/accounts.json');

  });

  describe('Accounts', function() {

    beforeEach(function() {
      accountsRequestHandler.respond(mockAccountsData);

    });

    it('should be an array of accounts', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(angular.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBe(1);
      });
    });

    it('should have an account name', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].name).toBe('Account 1');
      });
    });

    it('should have an account type', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].name).toBe('Current');
      });
    });

    it('should have an account balance', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].balance).toBe('100.00');
      });
    });

    it('should have an account currency', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(response.data[0].currency).toBe('GBP');
      });
    });

    it('should have an array of transactions', function() {
      accountService.getAccountsByUserId(1).then(function(response) {
        expect(angular.isArray(response.data[0].transactions)).toBeTruthy();
      });
    });


  });

});
