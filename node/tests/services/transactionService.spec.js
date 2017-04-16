var server;
var transactionService = require('../../services/transactionService');
var Transaction = require('../../models/transaction');
var Account = require('../../models/account');
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise')(sinon);

describe('The Transaction Service', function() {

  beforeEach(function(done) {
    server = require('../../server.js');
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  after(function() {
    sinon.restore(Transaction);
    sinon.restore(Account);
  });

  it('should call the Transaction model when adding a transaction', function(done) {

    var transactionToSave = Transaction.build({
      name: 'Test Transaction',
      type: 'Expense',
      amount: 167.90
    });

    var fakeAccount = Account.build({
      name: 'Test Account',
      balance: 100.00,
      type: 'ISA',
      currency: 'GBP'
    });
    fakeAccount.addTransaction = function() {};

    var stub = sinon.stub(transactionToSave, 'save');
    var findAccountByIdStub = sinon.stub(Account, 'findById');
    findAccountByIdStub.returnsPromise().resolves(fakeAccount);
    stub.returnsPromise().resolves([]);

    transactionService.addTransaction(transactionToSave, 1).then(function(response) {
      sinon.assert.calledOnce(stub);
      done();
    });


  });

});
