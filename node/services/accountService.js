const Account = require('../models/account');

var AccountService = {

  getAllAccounts: function(userId) {
    return Account.find({}).exec();
  },

  addAccount:  function(account) {
      return account.save();
  },

  deleteAccount: function(id) {
    return Account.findByIdAndRemove(id);
  }
}

module.exports = AccountService;
