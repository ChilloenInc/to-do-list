describe('TodoList', () => {
  beforeEach(() => {
    cy.exec('npm start');
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });

});
