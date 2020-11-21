// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check
describe('Layout', () => {
  before(() => {
    cy.visit('/');
  });
  it('Shows app header', () => {

  })
  it('Focuses to todo input', () => {

  })
  it('Shows help text', () => {

  })
})

describe('Working with todos', () => {
  before(() => {
    cy.visit('/');
  });
  
  describe('Create todos', () => {
    it('Allows to add plain todo', () => {

    })
    it('Allows to add unicode todo', () => {
  
    })
    it('Doesn\'t allow to add empty todo', () => {
  
    })
  })

  describe('Update todos', () => {
    before(() => {
      cy.visit('/');
    });
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
    before(() => {
      cy.visit('/');
    });
    it('Allows to remove active todo', () => {
  
    })
    it('Allows to remove completed todo', () => {
  
    })
    it('Allows to bulk remove completed todos ', () => {
  
    })
  })
})