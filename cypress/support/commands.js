
Cypress.Commands.add('login', () => {
    cy.visit('https://www.saucedemo.com/') 
    cy.get('[data-test="username"]').type(Cypress.env('username'))
    cy.get('[data-test="password"]').type(Cypress.env('password'))
    cy.get('[data-test="login-button"]').click()
  })

Cypress.Commands.add('addProductToCart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('contain', '1');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
  });
    
  
