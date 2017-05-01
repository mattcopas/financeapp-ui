const HomePage = require('../pageobjects/homePage');
const AddAccountModal = require('../pageobjects/addAccountModal');
const dbSetup = require('../setup/dbSetup');
var homePage;
var addAccountModal;

describe('The Home Page', function() {

  beforeEach(function() {
    dbSetup();
    browser.get('http://localhost:3000');

    homePage = new HomePage();
    addAccountModal = new AddAccountModal();


  });

  afterAll(function() {
    browser.close();
  })

  it('should have a title of Finance App', function() {
    expect(homePage.title).toBe('Finance App');
  });

  it('should have an Add Account button that opens the create account modal', function() {
    homePage.clickAddAccountButton();
    expect(homePage.addAccountModal.isDisplayed()).toBeTruthy();
  });

  it('should add a new acconut when the add account form is submitted', function() {
    homePage.clickAddAccountButton();
    addAccountModal.submitAddAccountForm('Test Account 1', 100, 'Current', 'GBP');
    // browser.driver.sleep(3000);
    // expect(homePage.getFirstAccountCellTextValues()).toEqual(['Test Account', 100, 'Current', 'GBP']);

  });


});
