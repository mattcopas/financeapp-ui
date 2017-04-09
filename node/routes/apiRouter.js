const express = require('express');
const app = express();
const apiRouter = express.Router();
const path = require('path');
const Account = require('../models/account');
const AccountService = require('../services/accountService');

apiRouter.get('/accounts', function(request, response) {
  AccountService.getAllAccounts(1).then(function(accounts) {
    response.json(accounts);
  }), function(err) {
    response.json(error);
  }
});

apiRouter.post('/account/save', function(request, response) {
  // TODO Add this as a custom function in account.js, or make an accountService
  var account = new Account({
    name: 'My First Account',
    type: 'Current',
    currency: 'GBP',
    balance: 100.00
  });

  account.save().then(function() {
    console.log("Record saved");
    response.status(202);
    response.redirect('/');
  });
});

module.exports = apiRouter;
