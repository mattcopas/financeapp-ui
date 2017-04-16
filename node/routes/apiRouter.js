const express = require('express');
const app = express();
const apiRouter = express.Router();
const path = require('path');
const Account = require('../models/account');
const AccountService = require('../services/accountService');
const bodyParser = require('body-parser');

apiRouter.use(bodyParser.json());

apiRouter.get('/accounts', function(request, response) {
  AccountService.getAllAccounts(1).then(function(accounts) {
    response.json(accounts);
  }), function(err) {
    response.json(error);
  }
});

apiRouter.post('/account/save', function(request, response) {

  console.log(request);
  var account = Account.build({
    name: request.body.account.name,
    type: request.body.account.type,
    currency: request.body.account.currency,
    balance: request.body.account.balance
  });

  AccountService.addAccount(account).then(function(err, res) {
    if(err) return err;
    console.log("Record saved");
    response.status(202);
    response.redirect('/');
  });
});

apiRouter.delete('/account/delete', function(request, response) {
  console.log("Request  query: ", request.query);
  AccountService.deleteAccount(request.query.id).then(function(err, res) {
    if(err) {
      response.json(error);
      return err;
    }
    console.log("Record with id " + request.query.id +  ' deleted');
    response.status(200);
    response.send('Account ' +  request.query.id + ' deleted');
  });
});

module.exports = apiRouter;
