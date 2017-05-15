describe('The Currency Service', function() {

  var currencyService;

  beforeEach(function() {

    module('financeApp');

    inject(function($injector) {
      currencyService = $injector.get('currencyService');
    });

  });

  it('should convert abbreviated currencies to symbols', function() {
    expect(currencyService.convertCurrencyToSymbol('GBP')).toBe('£');
    expect(currencyService.convertCurrencyToSymbol('USD')).toBe('$');
  });

});
