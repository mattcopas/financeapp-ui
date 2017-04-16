var Account = require('../models/account');

var AccountService = {

  addAccount:  function(account) {
      console.log("ADDING ACCOUNT");
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
      where: {}
    });
  }
}

module.exports = AccountService;
