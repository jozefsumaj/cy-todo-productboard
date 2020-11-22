/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Inject test todos stored in todos.json fixture via browser local storage
         * @example
         * cy.addTodosViaLocalStorage()
         */
        addTodosViaLocalStorage(): Chainable<any>
         /**
         * Add todo via UI, can mark it as completed
         * @example
         * cy.addTodoViaUI('Feed the cat', false)
         */
        addTodoViaUI(title: string, completed: boolean): Chainable<any>
    }
}
