const TableUtil = require('../utils/table');
const tableUtil = new TableUtil();
const protractorHelpers = require('protractor-helpers');

module.exports = function() {

  this.title = browser.getTitle();
  this.addAccountButton = element(by.buttonText('Add Account'));
  this.addAccountModal = element(by.css('.modal-dialog'));
  this.firstMakeTransactionButton = element(by.buttonText('Make Transaction'));
  this.makeTransactionModal = element(by.css('.modal-dialog'));
  this.firstDeleteAccountButton = element(by.css('.fa-times'));
  this.confirmDeleteAccountButton = element(by.buttonText('Delete'));

  this.clickAddAccountButton = function() {
    this.addAccountButton.click();
    protractorHelpers.waitForElement(this.addAccountModal);
  };

  this.clickMakeTransactionButton = function() {
    protractorHelpers.waitForElement(this.firstMakeTransactionButton, 3000);
    this.firstMakeTransactionButton.click();
    protractorHelpers.waitForElement(this.makeTransactionModal);
  };

  this.getFirstAccountCellTextValues = function() {
    var cells = tableUtil.getTableRows('account', 'safeCollection').first().all(by.tagName('td'));
    return tableUtil.getCellTextValues(cells);
  };

  this.getFirstTransactionCellTextValues = function() {
    var cells = tableUtil.getTableRows('transaction', 'safeTransactionsCollection').first().all(by.tagName('td'));
    return tableUtil.getCellTextValues(cells);
  };

  this.clickDeleteAccountButton = function() {
    protractorHelpers.waitForElement(this.firstDeleteAccountButton, 3000);
    this.firstDeleteAccountButton.click();
  };

  this.clickConfirmDeleteAcconutButton = function() {
    this.confirmDeleteAccountButton.click();
  };

  this.getNumberOfRowsInAccountsTable = function() {
    return tableUtil.getTableRows('account', 'safeCollection').all().count();
  };
  this.getNumberOfRowsInTransactionsTable = function() {
    return tableUtil.getTableRows('transaction', 'safeCollection').all().count();
  };

};
