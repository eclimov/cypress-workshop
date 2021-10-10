Given('I open homepage', () => {
    cy.visit(Cypress.env('url'))
})

When('I add an item to cart', () => {
    cy.get('div.product-container').first().find('a.ajax_add_to_cart_button').click()
    cy.get('#layer_cart').should('exist')
})

When('I click Proceed to Checkout', () => {
    cy.get('a[title="Proceed to checkout"]').click()
})

When('I remove an item from cart', () => {
    cy.get('a[title="Delete"]').click()
})

Then('I am on shopping-cart summary page', () => {
    cy.url().should('eq',`${Cypress.env('url')}?controller=order`)
})

Then('List of items in cart is not empty', () => {
    cy.get('#cart_summary').get('.cart_item').should('have.length.gt', 0)
})

Then('List of items in cart is empty', () => {
    cy.get('#cart_summary').get('.cart_item').should('have.length', 0)
})

