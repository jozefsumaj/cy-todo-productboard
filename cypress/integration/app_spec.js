// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check
describe('Layout', () => {
 
  describe('First access with no data', () => {
    before(() => {
      cy.visit('/')
    })

    it('Shows app header', () => {
      cy.get('h1').contains('todos')
    })

    it('Focuses to todo input', () => {
      cy.get('.new-todo').should('be.focused')
    })

    it('Shows edit help text', () => {
      cy.contains('Double-click to edit a todo')
    })
  });

  describe('With todos data', () => {
    before(() => {
      cy.addTodosViaLocalStorage() // also stores todos to @todos alias
      cy.visit('/')
    })

    it('Shows todos', function () {
      cy.log(`There should be ${this.todos.length} todos`)
      cy.get('.todo-list').find('li').should('have.length', 3)
    })

    it('Shows navigation', () => {
      cy.contains('All')
      cy.contains('Active')
      cy.contains('Completed')
      cy.contains('Clear completed')
      cy.get('a[href="#/"]').should('have.class','selected')
    })

    it('Shows how many todos items are left', () => {
      cy.contains('1 item left')
    })
  });
})

describe('Working with todos', () => {
  before(() => {
    cy.fixture('todos').as('todos')
  })

  beforeEach(() => {
    cy.visit('/');
  });
  
  describe('Create todos', () => {
    it('Allows to add plain todo', function () {
      cy.get('.new-todo')
        .type(`${this.todos[0].title} {Enter}`)
      cy.get('.todo-list')
        .find('li')
        .should('have.length', 1)
        .should('have.text', `${this.todos[0].title}`)
    })

    it('Allows to add unicode todo', () => {
  
    })

    it('Doesn\'t allow to add empty todo', () => {
      cy.get('.new-todo')
        .type('{Enter}')
      cy.get('.todo-list')
        .should('not.exist')
    })
  })

  describe('Update todos', () => {
    it('Allows to edit active todo', () => {

    })

    it('Allows to edit completed todo', () => {

    })

    it('Allows to cancel edit action', () => {
  
    })

    it('Allows to remove todo by editing', () => {
  
    })
  })

  describe('Remove todos', () => {
    it('Allows to remove active todo', () => {
  
    })

    it('Allows to remove completed todo', () => {
  
    })

    it('Allows to bulk remove completed todos ', () => {
  
    })
  })
})
