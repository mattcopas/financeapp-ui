const TableUtil = require('../utils/table');
const tableUtil = new TableUtil();

module.exports = function() {

  this.title = browser.getTitle();
  this.addAccountButton = element(by.buttonText('Add Account'))
  this.addAccountModal = element(by.css('.modal-dialog'));

  this.clickAddAccountButton = function() {
    this.addAccountButton.click();
  };

  this.getFirstAccountCellTextValues = function() {
    var cells = tableUtil.getTableRows('account', 'safeCollection').first().all(by.tagName('td'));
    return tableUtil.getCellTextValues(cells);
  }

};
