financeApp.service('currencyService', function() {

  this.convertCurrencyToSymbol = function(currencyAbbreviation) {
    switch(currencyAbbreviation) {
      case 'GBP':
        return '£';
      case 'USD':
        return '$';
    }
  };

});
