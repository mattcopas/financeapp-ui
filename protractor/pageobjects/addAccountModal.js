module.exports = function() {

  var accountNameInput = element(by.model('account.name'));
  var accountBalanceInput = element(by.model('account.balance'));
  var accountTypeInput = element(by.model('account.type'));
  var accountCurrencyInput = element(by.model('account.currency'));
  var submitButton = element(by.buttonText('Submit'));

  this.submitAddAccountForm = function(accountName, accountBalance, accountType, accountCurrency) {
    accountNameInput.sendKeys(accountName);
    accountBalanceInput.sendKeys(accountBalance);
    element(by.cssContainingText('option', accountType)).click();
    element(by.cssContainingText('option', accountCurrency)).click();
    submitButton.click();
  }

};
