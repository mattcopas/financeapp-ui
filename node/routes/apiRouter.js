const express = require('express');
const app = express();
const apiRouter = express.Router();
const path = require('path');
const Account = require('../models/account');
const Transaction = require('../models/transaction');
const AccountService = require('../services/accountService');
const TransactionService = require('../services/transactionService');
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

  var account = Account.build({
    name: request.body.account.name,
    type: request.body.account.type,
    currency: request.body.account.currency,
    balance: request.body.account.balance
  });

  AccountService.addAccount(account).then(function(res) {
    console.log("Record saved");
    response.status(202);
    response.redirect('/');
  }), function(err) {
    response.json(err);
  };
});

apiRouter.delete('/account/delete', function(request, response) {
  console.log("Request  query: ", request.query);
  AccountService.deleteAccount(request.query.id).then(function(err, res) {
    if(err) {
      response.json(err);
      return err;
    }
    console.log("Record with id " + request.query.id +  ' deleted');
    response.status(200);
    response.send('Account ' +  request.query.id + ' deleted');
  });
});

apiRouter.post('/transaction/save', function(request, response) {
  console.log("Request body for adding transaction: ", request.body.transaction);
  var transaction = Transaction.build({
    name: request.body.transaction.name,
    type: request.body.transaction.type,
    amount: request.body.transaction.amount
  });

  TransactionService.addTransaction(transaction).then(function(res) {
    response.status(200);
    response.send('Transaction created');
  }).catch(function(error) {
    response.status(500);
    response.json(error);
  });
});

module.exports = apiRouter;
