module.exports = function() {

  this.getTableRows = function(modelObject, collection) {
    return element.all(by.repeater(modelObject + ' in ' + collection));
  };

  this.getCellTextValues = function(cells) {
    var cellTextValues = cells.filter(function(cell) {
      return cell.getText();
    });
    return cellTextValues.getText();
  };

};
