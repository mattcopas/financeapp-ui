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

  after(function() {
    sinon.restore(Account);
  });

  it('should call the account model to get the accounts', function() {

    var stub = sinon.stub(Account, 'findAll');
    
    AccountService.getAllAccounts(1);
    sinon.assert.calledOnce(stub);

  });

  it('should call the account model to save the account', function() {
    var accountToSave = Account.build({
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
    var stub = sinon.stub(Account, 'destroy');

    AccountService.deleteAccount('123');
    sinon.assert.calledOnce(stub);
  });

});
