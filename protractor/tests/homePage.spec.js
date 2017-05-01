const HomePage = require('../pageobjects/homePage');
const AddAccountModal = require('../pageobjects/addAccountModal');
const MakeTransactionModal = require('../pageobjects/makeTransactionModal');
const dbSetup = require('../setup/dbSetup');
const moment = require('moment');
var homePage;
var addAccountModal;
var makeTransactionModal;

describe('The Home Page', function() {

  beforeEach(function() {
    dbSetup();
    browser.get('http://localhost:3000');

    homePage = new HomePage();
    addAccountModal = new AddAccountModal();
    makeTransactionModal = new MakeTransactionModal;


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
    expect(homePage.getFirstAccountCellTextValues()).toEqual(['Test Account 1', 'Current', '£100.00', 'GBP', 'Make Transaction', 'Edit']);
  });

  it('should show a Make Transaction Modal when a Make Transaction button is clicked', function() {
    homePage.clickAddAccountButton();
    addAccountModal.submitAddAccountForm('Test Account 1', 100, 'Current', 'GBP');
    browser.sleep(1000);
    homePage.clickMakeTransactionButton();
    expect(homePage.makeTransactionModal.isDisplayed()).toBeTruthy();
  });

  it('should add a transaction to the transactions table', function() {
    homePage.clickAddAccountButton();
    addAccountModal.submitAddAccountForm('Test Account 1', 100, 'Current', 'GBP');
    browser.sleep(1000);
    homePage.clickMakeTransactionButton();
    makeTransactionModal.submitMakeTransactionForm('Test Transaction 1', 'Income', 50);
    var todaysDate = moment().format('MMMM D, YYYY');
    expect(homePage.getFirstTransactionCellTextValues()).toEqual(['Test Transaction 1', 'Income', '£50.00', 'Test Account 1', 'No', todaysDate]);
    expect(homePage.getFirstAccountCellTextValues()).toEqual(['Test Account 1', 'Current', '£150.00', 'GBP', 'Make Transaction', 'Edit']);
  });

});
