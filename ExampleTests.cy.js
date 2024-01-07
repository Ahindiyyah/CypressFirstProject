import { fa, faker } from '@faker-js/faker';

// Define custom commands
Cypress.Commands.add('loginAsManager', () => {
  cy.visit('https://globalsqa.com/angularJs-protractor/BankingProject/#/login');
  cy.get(':nth-child(3) > .btn').click();
  cy.get('[ng-class="btnClass1"]').click();
});

Cypress.Commands.add('createAccount', (firstName, lastName, accountNumber) => {
  cy.get(':nth-child(1) > .form-control').type(firstName);
  cy.get(':nth-child(2) > .form-control').type(lastName);
  cy.get(':nth-child(3) > .form-control').type(accountNumber);
  cy.get('form.ng-dirty > .btn').click();
});

Cypress.Commands.add('selectTheCreatedAccount', (accountId, currencyId) => {
  cy.get('[ng-class="btnClass2"]').click();
  cy.get('#userSelect').select(accountId);
  cy.get('#currency').select(currencyId);
  cy.get('form.ng-dirty > button').click();
});

Cypress.Commands.add('verifyAlertMessage', (expectedMessage) => {
  let alertCount = 0;

  cy.on('window:alert', (message) => {
    alertCount++;

    if (alertCount === 2) {
      const alertMessage = message;
      console.log('Alert Message:', alertMessage);
      expect(alertMessage).to.include(expectedMessage);
    }
  });
});

Cypress.Commands.add('DeleteTheCreatedAccount', () => {
  cy.get('[ng-class="btnClass3"]').click();
  cy.get(':nth-child(6) > :nth-child(5) > button').click();
  cy.screenshot();
});

// Test
describe('template spec', () => {
  it('passes', () => {
    cy.loginAsManager();

    const nameFirst = faker.name.firstName();
    const lastName = faker.name.lastName();
    const accountNumber = Math.floor(Math.random() * 5000);

    cy.createAccount(nameFirst, lastName, accountNumber);
    cy.selectTheCreatedAccount(6, Math.floor(Math.random() * 2) + 1);
    cy.verifyAlertMessage('Account created successfully with account Number');
    cy.DeleteTheCreatedAccount();
  });
});
