Cypress.Commands.add('addTodosViaLocalStorage', function () {
  cy.fixture('todos')
    .as('todos')
    .then(todos => {
      window.localStorage.setItem('react-todos', JSON.stringify(todos))
    })
})

Cypress.Commands.add('addTodoViaUI', function (title, completed) {
  cy.get('.new-todo')
    .type(`${title}{Enter}`)
    
  cy.get('.todo-list')
    .contains(title)
    .then(function($todoItem) {
      if(completed)
        cy.wrap($todoItem)
          .get('.toggle')
          .click()

        cy.get($todoItem) //get newly created todo so it can be aliased in specs
    })
})
