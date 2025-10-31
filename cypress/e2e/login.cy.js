describe('Login ', () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');

  beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
    })

it('Login with valid credentials ', () => {
  cy.get('[data-test="username"]').click().type(username);
  cy.get('[data-test="password"]').click().type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
})

it('Login with invalid credentials', () => {
  cy.get('[data-test="username"]').click().type("Testing");
  cy.get('[data-test="password"]').click().type(password);
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]')
  .should('be.visible')
  .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
})

it('Fill the username field and leave password empty', () => {
  cy.get('[data-test="username"]').click().type(username);
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]')
  .should('be.visible')
  .and('contain.text', 'Epic sadface: Password is required');
})

it('Fill the password field and leave username empty', () => {
  cy.get('[data-test="password"]').click().type(password);
  cy.get('[data-test="login-button"]').click();
  cy.get('[data-test="error"]')
  .should('be.visible')
  .and('contain.text', 'Epic sadface: Username is required');
})
})