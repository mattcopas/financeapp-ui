module.exports = function() {

  this.transactionNameInput = element(by.model('transaction.name'));
  this.transactionTypeInput = element(by.model('transaction.type'));
  this.transactionAmountInput = element(by.model('transaction.amount'));
  this.submitButton = element(by.buttonText('Submit Transaction'));

  this.submitMakeTransactionForm = function(name, type, amount) {
    this.transactionNameInput.sendKeys(name);
    element(by.cssContainingText('option', type)).click();
    this.transactionAmountInput.sendKeys(amount);
    this.submitButton.click();
  
  };
};
