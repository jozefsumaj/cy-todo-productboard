/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Create several Todo items via UI
         * @example
         * cy.createDefaultTodos()
         */
        addTodosLocalStorage(): Chainable<any>
    }
}
