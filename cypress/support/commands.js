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
    .then(function () {
      if(completed) 
        cy.get('.todo-list')
          .contains(title)
          .get('.toggle').click();
    })
})
