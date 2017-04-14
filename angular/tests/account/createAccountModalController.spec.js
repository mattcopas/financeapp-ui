'use strict';

var createAccountModalController;
var accountService;
var scope;

describe('The create account modal controller', function() {

  beforeEach(function() {

    module('financeApp');

    scope = {};

    inject(function($injector, $controller) {
      accountService = $injector.get('accountService');

      createAccountModalController = $controller('createAccountModalController', {'$scope':scope});

      spyOn(accountService, 'postCreateAccountData').and.callThrough();
    });


  });

  it('should have an account object', function() {
    expect(scope.account).toBeDefined();
  });

  it('should call the accountService when the account creation form is submitted', function() {
    scope.submitCreateAccountForm(scope.account);
    expect(accountService.postCreateAccountData).toHaveBeenCalledWith(scope.account);
  });

});
