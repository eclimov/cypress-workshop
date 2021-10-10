/// <reference types="cypress" />

import Home from "../support/pageObjects/Home"

describe('homepage', () => {
    const homepage = new Home()
    let homepageData
    before(async () => {
        homepageData = await cy.fixture('homepage')
    })

    beforeEach(() => {
        cy.visit(Cypress.env('url'))
    })

    it('should have valid image in header', () => {
        homepage.getBrandingLogo().invoke('attr', 'src')
            .should('eq', homepageData.logoUrl)
    })

    describe('category cards', () => {
        let categoryCardsData
        before(async () => {
            categoryCardsData = homepageData.categoryCards
        })

        it('should have correct number of category cards', async () => {
            homepage.getCategoryCards()
                .should('have.length', Object.keys(categoryCardsData).length)
        })

        it('should lead to correct page when clicked', () => {
            const categoryCards = homepage.getCategoryCards()
            const categoryCardsTitles = Object.keys(categoryCardsData)
            for (const categoryCardsTitle of categoryCardsTitles) {
                cy.visit(Cypress.env('url'))
                const categoryCard = categoryCards.get('h5').contains(categoryCardsTitle)
                categoryCard.click()
                cy.url().should(
                    'eq',
                    `${Cypress.env('url')}/${categoryCardsData[categoryCardsTitle]}`
                )
            }
        })
    })
})
