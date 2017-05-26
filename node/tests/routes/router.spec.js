var request = require('supertest');
var server;
var assert = require('chai').assert;
var expect = require('chai').expect;

/**
  MOCHA
*/
describe('The server', function() {

  beforeEach(function(done) {
    server = require('../../server.js');
    done();
  });

  afterEach(function(done) {
    server.close();
    done();
  });

  it('should return index.html when a GET request to / is made', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end(function(error, response) {
        if(error) return done(error);
        done();
      })
  });
});
