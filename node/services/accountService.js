var Account = require('../models/account');
var Transaction = require('../models/transaction');

var AccountService = {

  addAccount:  function(account) {
      return account.save();
  },

  deleteAccount: function(id) {
    return Account.destroy({
      where: {
        id: id
      }
    });
  },

  getAllAccounts: function(userId) {
    return Account.findAll({
      include: [Transaction],
      where: {}
    });
  }
}

module.exports = AccountService;
