// const mongoose = require('mongoose');
// var request = require('supertest');
// var connection;
// var server;
//
// describe('The API Router', function() {
//   beforeEach(function(done) {
//     server = require('../../server');
//
//     mongoose.connect('localhost:27017/financeapp_test').on('connect', function() {
//       console.log("Connected to test database");
//       done();
//     }).on('error', function() {
//       console.log("ERROR CONNECTING TO TEST DB");
//     });
//   });
//
//   afterEach(function(done) {
//     server.close();
//     mongoose.connection.close().then(function() {
//       console.log('Disconnected from test database');
//       done();
//     });
//   });
//
//   it('should save an account to the database', function() {
//     request(server).post('/api/account/save').send({});
//   });
// })
