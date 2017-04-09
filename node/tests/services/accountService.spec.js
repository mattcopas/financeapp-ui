var server;
var AccountService = require('../../services/accountService');
var sinon = require('sinon');
var Account = require('../../models/account');

describe('The account service', function() {

  beforeEach(function(done) {
    server = require('../../server.js');
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  it('should call the account model to get the accounts', function() {
    var spy = sinon.spy(Account, 'find');

    AccountService.getAllAccounts(1);
    sinon.assert.calledOnce(spy);

  });

});
