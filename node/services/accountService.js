const Account = require('../models/account');

var AccountService = {

  getAllAccounts: function(userId) {
    return Account.findAll({
      where: {}
    });
  },

  addAccount:  function(account) {
      return account.save();
  },

  deleteAccount: function(id) {
    return Account.destroy({
      id: id
    });
  }
}

module.exports = AccountService;
