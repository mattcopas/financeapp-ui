module.exports = function() {

  this.title = browser.getTitle();
  this.addAccountButton = element(by.buttonText('Add Account'))
  this.addAccountModal = element(by.css('.modal-dialog'));

  this.clickAddAccountButton = function() {
    this.addAccountButton.click();
  };

  this.getFirstAccountCellTextValues = function() {
    var cells = this.getAccountsTableData('account').first().all(by.tagName('td'));
    console.log("CELLS: ", cells);
    var cellTexts = [];
    for(var i = 0; i < cells.length; i++) {
      cells[i].getText().then(function(text, done) {
        cellTexts.push(text);
        done();
      })
    }
    return cellTexts;
  }

  this.getAccountsTableData = function(tableDataType) {
    var tableRows = element.all(by.repeater(tableDataType + ' in safeCollection'));
    return tableRows;
  }
};
