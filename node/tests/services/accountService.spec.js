var server;
var AccountService = require('../../services/accountService');
var sinon = require('sinon');
var Account = require('../../models/account');
var sinonStubPromise = require('sinon-stub-promise')(sinon);

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

  it('should call the account model to get the accounts', function(done) {

    var stub = sinon.stub(Account, 'findAll');
    stub.returnsPromise().resolves([]);
    AccountService.getAllAccounts(1).then(function(response) {
      sinon.assert.calledOnce(stub);
      done();
    });

  });

  it('should call the account model to save the account', function(done) {
    var accountToSave = Account.build({
      name: 'Test Account',
      type: 'Current',
      balance: 30002,
      currency: 'USD'
    });

    var stub = sinon.stub(accountToSave, 'save');
    stub.returnsPromise().resolves([]);

    AccountService.addAccount(accountToSave).then(function(response) {
      sinon.assert.calledOnce(stub);
      done();
    });

  });

  it('should call the account model to delete an account', function(done) {
    var stub = sinon.stub(Account, 'destroy');
    stub.returnsPromise().resolves([]);
    AccountService.deleteAccount('123').then(function(response) {
      sinon.assert.calledOnce(stub);
      done();
    });

  });

});
