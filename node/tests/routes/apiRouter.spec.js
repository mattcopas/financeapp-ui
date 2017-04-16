var request = require('supertest');
var server;
var sinon = require('sinon');
const accountService = require('../../services/accountService');
var Account = require('../../models/account');
var sinonStubPromise = require('sinon-stub-promise')(sinon);

describe('The API Router', function() {
  beforeEach(function(done) {
    server = require('../../server');
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  after(function() {
    sinon.restore(Account);
    sinon.restore(accountService);
  });

  it('should call the accountService to get accounts', function(done) {
    var spy = sinon.spy(accountService, 'getAllAccounts');
    var stub = sinon.stub(Account, 'findAll');
    stub.returnsPromise().resolves([]);
    request(server)
      .get('/api/accounts')
      .expect(200)
      .end(function(err, response) {
        if(err) return done(err);
        sinon.assert.calledOnce(spy);
        done();
      });
  });

  it('should call the accountService to save an account', function(done) {

    var accountToSend = {
      name: 'Test Account',
      type: 'ISA',
      balance: 567.87,
      currency: 'USD'
    };

    var stub = sinon.stub(accountService, 'addAccount');
    stub.returnsPromise().resolves([]);

    request(server)
      .post('/api/account/save')
      .send({account: accountToSend})
      .end(function(err, res) {
        sinon.assert.calledOnce(stub);
        done();
      });
  });

  it('should call the accountService to delete an account', function(done) {
    var stub = sinon.stub(accountService, 'deleteAccount');
    stub.returnsPromise().resolves([]);
    request(server)
      .delete('/api/account/delete?id=1')
      .end(function(err, res) {
        sinon.assert.calledOnce(stub);
        done();
      });
  });

})
