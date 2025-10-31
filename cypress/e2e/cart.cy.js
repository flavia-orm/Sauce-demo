describe('Testes da loja', () => {

    beforeEach(() => {
      cy.login();
    })
    
    it('Add an item to cart and complete a purchase.', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '1');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
        cy.get('[data-test="firstName"]').type("Flávia");
        cy.get('[data-test="lastName"]').type("Morais");
        cy.get('[data-test="postalCode"]').type("252525255");
        cy.get('[data-test="continue"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');
        cy.get('[data-test="finish"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html');    
        cy.contains('Thank you for your order!').should('be.visible');
      })

    it('Add an item to your cart and remove it.', () => {  
        cy.addProductToCart();
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    })

    it('Add a product to the cart and remove it from the cart page', () => {  
        cy.addProductToCart();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html'); 
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('[data-test="inventory-item-name"]').should('not.exist');
    })

    it('Add multiple products to the cart', () => {  
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();  
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '3');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');    
        cy.contains('Sauce Labs Bolt T-Shirt').should('be.visible');
    }) 
    
    it('Add product to cart, open product page from cart, then remove', () => { 
        cy.addProductToCart();
        cy.contains('Sauce Labs Backpack').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4');
        cy.get('[data-test="remove"]').click();
        cy.contains('Add to cart').should('be.visible');
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    })
    
    it('Testing mandatory fields in checkout', () => {   
        cy.addProductToCart();
        cy.get('[data-test="checkout"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
        cy.get('[data-test="firstName"]').type("Flávia");
        cy.get('[data-test="continue"]').click();
        cy.contains('Error: Last Name is required').should('be.visible');
        cy.get('[data-test="lastName"]').type("Testing");
        cy.get('[data-test="continue"]').click();
        cy.contains('Error: Postal Code is required').should('be.visible');
        cy.get('[data-test="postalCode"]').type("2525252525");
        cy.get('[data-test="firstName"]').clear();
        cy.get('[data-test="continue"]').click();
        cy.contains('Error: First Name is required').should('be.visible');
    })
    
})