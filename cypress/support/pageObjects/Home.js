export default class Home {
    getBrandingLogo () {
        return cy
            .get('header')
            .get(`a[href="${Cypress.env('url')}"] img`)
    }

    getCategoryCards () {
        return cy.get('.category-cards .card.top-card')
    }

    getCategoryCardElements () {
        return this.getCategoryCards().first()
    }

    getCategoryCardBookStoreWidgets () {
        return this.getCategoryCards().eq(3)
    }

    getCategoryCardBookStoreApplication () {
        return this.getCategoryCards().last()
    }
}
