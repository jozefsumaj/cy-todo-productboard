// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

describe('Assignment', function () {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('tests something', () => {

  });

})
