const Account = require('../models/account');

var AccountService = {
  getAllAccounts: function(userId) {
    return Account.find({}).exec();
  }
}

module.exports = AccountService;
