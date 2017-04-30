const HomePage = require('../pageobjects/homePage');
var homePage;

describe('The Home Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');

    homePage = new HomePage();

  });

  afterEach(function() {
    browser.close();
  })

  it('should have a title of Finance App', function() {
    expect(homePage.title).toBe('Finance App');
  });

});
