describe('TodoList', () => {
  beforeEach(() => {
    cy.exec('npm start');
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });

  it('목록 제대로 렌더링 되는지 확인', () => {
    //default TodoList
    const todos = [
      {
        id: 1,
        title: "React",
        body: "React is",
      },
      {
        id: 2,
        title: "JS",
        body: "JS is",
      },
      {
        id: 3,
        title: "Todo",
        body: "Todo something...",
      },
    ];

    // Render todos on the page
    cy.get('.box_wrap').within(() => {
      todos.forEach((todo, index) => {
        cy.get(`.items:eq(${index})`).should('exist');
        cy.get(`.items:eq(${index}) .list_title`).should('have.text', todo.title);
        cy.get(`.items:eq(${index}) .list_text`).should('have.text', todo.body);
      });
    });
  });

});
