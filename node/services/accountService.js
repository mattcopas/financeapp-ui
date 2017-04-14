const Account = require('../models/account');

var AccountService = {

  getAllAccounts: function(userId) {
    return Account.find({}).exec();
  },

  addAccount:  function(account) {
      return account.save();
  }
}

module.exports = AccountService;
