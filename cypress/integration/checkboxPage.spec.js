/// <reference types="cypress" />

import CheckboxPage from "../support/pageObjects/CheckboxPage";

describe('checkboxPage', () => {
    const checkboxPage = new CheckboxPage()

    beforeEach(() => {
        cy.visit(`${Cypress.env('url')}/checkbox`)
    })

    it('should not render all checkbox options by default', () => {
        checkboxPage.getFirstLevelNodeList().should('have.length', 0)
        checkboxPage.getToggler().first().click()
        checkboxPage.getFirstLevelNodeList().should('have.length', 1)
    })

    it('should display actual text when an option is selected', () => {
        cy.get('button[title="Expand all"]').click()
        cy.get('span.rct-title').contains('Notes').click()
        cy.get('#result span').first().should('contain.text', 'You have selected :')
        cy.get('#result span.text-success').should('contain.text', 'notes')
    })
})
