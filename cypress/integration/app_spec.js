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

    it('Doesn`t show clear completed todos option', () => {
      cy.get('.clear-completed').should('not.be','visible')
    })
  })

  describe('With todos data', () => {
    before(() => {
      cy.addTodosViaLocalStorage() // also stores todos to @todos alias
      cy.visit('/')
    })

    it('Shows todos', function () {
      cy.log(`There should be ${this.todos.length} todos`)
      cy.get('.todo-list')
        .find('li')
        .should('have.length', 3)
    })

    it('Shows navigation', () => {
      cy.contains('All')
      cy.contains('Active')
      cy.contains('Completed')
      cy.contains('Clear completed')
      cy.get('a[href="#/"]').should('have.class','selected')
    })

    it('Shows how many todos items are left', () => {
      cy.contains('2 items left')
    })
  })
})

describe('Working with todos', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('todos').as('todos')
  })
  
  describe('Create todos', () => {
    it('Allows to add new todo', function () {
      cy.get('@todos').then((todos) => {

        const plainTodoTitle = todos[0].title;

        cy.addTodoViaUI(plainTodoTitle, false)
          .as('plainTodo')
        cy.get('@plainTodo')
          .should('have.length', 1)
          .should('have.text', `${plainTodoTitle}`)
        
        // should appear under active
        cy.get('a[href="#/active"]')
          .click()
        cy.get('.todo-list')
          .find('li')
          .eq(0)
          .should('have.text', `${plainTodoTitle}`)
          
        // should not appear under completed yet
        cy.get('a[href="#/completed"]')
          .click()
        cy.get('.todo-list')
          .should('not.be.visible')
      })
    })

    it('Allows to add unicode todo', function () {
      cy.get('@todos').then((todos) => {

        const unicodeTodoTitle = todos[2].title;

        cy.addTodoViaUI(unicodeTodoTitle, false)
          .as('unicodeTodo')

        cy.get('@unicodeTodo')
          .should('have.length', 1)
          .should('have.text', `${unicodeTodoTitle}`)
      })  
    })

    it('Doesn\'t allow to add empty todo', () => {
      cy.get('.new-todo')
        .type('{Enter}')
      cy.get('.todo-list')
        .should('not.exist')
    })

    it('Increases and decreases todo counter', () => {
      cy.addTodoViaUI("First todo", false)
      cy.contains('1 item left')
      cy.addTodoViaUI("Second todo", false)
      cy.contains('2 items left')
      cy.deleteTodoViaUI("Second todo")
      cy.contains('1 item left')
    })
  })

  describe('Update todos', () => {
    it('Allows to mark todos as completed', () =>{
      cy.addTodoViaUI("Buy groceries", false)
        .get('.toggle')
        .click()
        .closest('.completed')
        .should('be.visible')
        // toggle again to un-complete
        .get('.toggle')
        .click()
        .closest('li')
        .should('not.have.class','completed')
    })

    it('Allows to edit active todo', () => {
      cy.addTodoViaUI("Prepare lunch", false)
        .as('todo')
      cy.get('@todo')
        .dblclick()
      cy.get('.edit')
        .type(' - Today!{Enter}')
      cy.get('@todo')
        .should('have.text','Prepare lunch - Today!')
    })

    it('Allows to edit completed todo', () => {
      cy.addTodoViaUI("Go for a run", true)
        .as('todo')
      cy.visit('#/completed')
      cy.get('@todo')
        .dblclick()
      cy.get('.edit')
        .type(' - at least 5km{Enter}')
      cy.get('@todo')
        .should('have.text','Go for a run - at least 5km')
    })

    it('Allows to cancel edit action', () => {
      cy.addTodoViaUI("Read a book", false)
        .as('todo')
      cy.get('@todo')
        .dblclick()
      cy.get('.edit')
        .type(' - Radical Candor{Esc}')
      cy.get('@todo')
        .should('have.text','Read a book')
    })
  })

  describe('Remove todos', () => {
    it('Allows to remove completed todo', () => {
      cy.addTodoViaUI("Buy some coffee", true)
      cy.get('a[href="#/completed"]')
        .click()
      cy.deleteTodoViaUI('Buy some coffee')
    })

    it('Allows to remove todo by editing', () => {
      cy.addTodoViaUI("Plan a trip with friends", false)
        .as('todo')
      cy.get('@todo')
        .dblclick()
      cy.get('.edit')
        .clear()
        .type('{Enter}')
      cy.get('@todo')
        .should('not.be.visible')
    })

    it('Allows to bulk remove completed todos ', () => {
      cy.addTodoViaUI("Buy some coffee", true)
      cy.get('.clear-completed')
        .click()
      cy.get('.todo-list')
        .should('not.be.visible')
    })
  })
})
