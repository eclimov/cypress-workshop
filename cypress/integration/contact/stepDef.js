Given('I open contact page', () => {
    cy.visit(`${Cypress.env('url')}?controller=contact`)
})

When('I fill form with heading as {string}', (heading) => {
    cy.get('#id_contact').select(heading)
})

When('I fill form with email as {string}', (email) => {
    if (email) {
        cy.get('#email').type(email)
    }
})

When('I fill form with order reference as {string}', (orderReference) => {
    cy.get('#id_order').type(orderReference)
})

When('I fill form with message as {string}', (message) => {
    if (message) {
        cy.get('#message').type(message)
    }
})

When('I submit the form', () => {
    cy.get('#submitMessage').click()
})

Then('I receive a successful message', () => {
    cy.get('.alert.alert-success').should('contain.text', 'Your message has been successfully sent to our team.')
})

Then('I receive an error message: {string}', (message) => {
    cy.get('.alert.alert-danger').should('contain.text', message)
})


