const TableUtil = require('../utils/table');
const tableUtil = new TableUtil();
const protractorHelpers = require('protractor-helpers');

module.exports = function() {

  this.title = browser.getTitle();
  this.addAccountButton = element(by.buttonText('Add Account'));
  this.addAccountModal = element(by.css('.modal-dialog'));
  this.firstMakeTransactionButton = element(by.buttonText('Make Transaction'));
  this.makeTransactionModal = element(by.css('.modal-dialog'));

  this.clickAddAccountButton = function() {
    this.addAccountButton.click();
  };

  this.clickMakeTransactionButton = function() {
    protractorHelpers.waitForElement(this.firstMakeTransactionButton, 3000);
    this.firstMakeTransactionButton.click();
  };

  this.getFirstAccountCellTextValues = function() {
    var cells = tableUtil.getTableRows('account', 'safeCollection').first().all(by.tagName('td'));
    return tableUtil.getCellTextValues(cells);
  };

  this.getFirstTransactionCellTextValues = function() {
    var cells = tableUtil.getTableRows('transaction', 'safeTransactionsCollection').first().all(by.tagName('td'));
    return tableUtil.getCellTextValues(cells);
  };

};
