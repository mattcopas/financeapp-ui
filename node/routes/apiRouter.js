const express = require('express');
const app = express();
const apiRouter = express.Router();
const path = require('path');
const Account = require('../models/account');

apiRouter.post('/account/save', function(request, response) {
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
