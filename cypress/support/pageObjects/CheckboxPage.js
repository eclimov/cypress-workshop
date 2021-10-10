export default class CheckboxPage {
    getFirstLevelNodeList () {
        return cy.get('.rct-node-parent ol')
    }

    getToggler () {
        return cy.get('button[title="Toggle"]')
    }
}
