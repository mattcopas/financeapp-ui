var server;
var transactionService = require('../../services/transactionService');
var Transaction = require('../../models/Transaction');
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
  });

  it('should call the Transaction model when adding a transaction', function(done) {

    var transactionToSave = Transaction.build({
      name: 'Test Transaction',
      type: 'Expense',
      amount: 167.90
    });
    
    var stub = sinon.stub(transactionToSave, 'save');
    stub.returnsPromise().resolves([]);

    transactionService.addTransaction(transactionToSave).then(function(response) {
      sinon.assert.calledOnce(stub);
      done();
    });


  });

});
