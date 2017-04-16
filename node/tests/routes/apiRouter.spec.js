var request = require('supertest');
var server;
var sinon = require('sinon');
const accountService = require('../../services/accountService');

describe('The API Router', function() {
  beforeEach(function(done) {
    server = require('../../server');
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  // it('should call the accountService to get accounts', function(done) {
  //   var stub = sinon.stub(accountService, 'getAllAccounts');
  //   done();
  //   // request(server).get('/api/acounts')
  //   //   //.expect(200)
  //   //   .end(function(error, response) {
  //   //     if(error) return done(error);
  //   //     sinon.assert.calledOnce(stub);
  //   //     done();
  //   //   });
  //   // sinon.assert.calledOnce(stub);
  // });

  // it('should call the accountService to save an account', function(done) {
  //   var stub = sinon.stub(accountService, 'addAccount');
  //   request(server).post('/api/account/save')
  //     .send({
  //       account: {
  //         name: 'Test Account',
  //         balance: 100,
  //         currency: 'GBP',
  //         type: 'Current'
  //       }
  //     })
  //     .end(function(err, response) {
  //       if(err) return done(err);
  //       sinon.assert.calledOnce(stub);
  //       done();
  //     });
  //
  // });

})
