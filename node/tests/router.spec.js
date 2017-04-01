var request = require('supertest');
var server;
describe('The server', function() {

  beforeEach(function() {
    server = require('../server.js');
  });

  afterEach(function() {
    server.close();
  })

  it('should return index.html when a request to / is sent', function(done) {
    request(server).get('/').expect(200)
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .end(done);
  });

});
