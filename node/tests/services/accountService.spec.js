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

  it('should call the account model to save the account', function() {
    var accountToSave = new Account({
      name: 'Test Account',
      type: 'Current',
      balance: 30002,
      currency: 'USD'
    });

    var stub = sinon.stub(accountToSave, 'save');

    AccountService.addAccount(accountToSave);

    sinon.assert.calledOnce(stub);
  });

  it('should call the account model to delete an account', function() {
    var stub = sinon.stub(Account, 'findByIdAndRemove');

    AccountService.deleteAccount('123');
    sinon.assert.calledOnce(stub);
  });

});
