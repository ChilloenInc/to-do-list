describe('template spec', () => {
  beforeEach(() => {
    cy.exec('npm start');
    cy.visit('http://localhost:3000');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });

 it('빈 Todo를 저장할 때 Alert 창이 나타나는지 확인', () => {
  cy.get('.buttons .addBtn').click(); 
  cy.get('.buttons .checkBtn').click(); 

  // Alert 창이 나타나는지 확인
  cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal("내용을 입력하세요");
    });
  }); 

//작성한상태로 뒤로가기 버튼 누르면 confirm창이나오고 아니면 원래 목록으로 돌아간다.
it('뒤로가기 버튼 클릭 시 confirm 창', () => {
  cy.get('.buttons .addBtn').click();
  // eslint-disable-next-line cypress/unsafe-to-chain-command
  //제목 입력중일 때
  cy.get('.form input').type('test@');
  cy.get('#returnBtn').click();
  // confirm 창이 나타나지 않는지 확인
  cy.on('window:confirm', (confirmText) => {
    expect(confirmText).to.equal('Are you sure you want to remove everything');
  });

  cy.get('.buttons .addBtn').click();
  //description 입력중일 때
  cy.get('.form textarea').type('test@');
  cy.get('#returnBtn').click();

  // confirm 창이 나타나지 않는지 확인
  cy.on('window:confirm', (confirmText) => {
    expect(confirmText).to.equal('Are you sure you want to remove everything');
  });
});

it('Todo입력하기', () => {
    cy.get('.buttons .addBtn').click();
    //title, descripton입력하고 체크버튼 누르면 Todolist에 추가  
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('.form input').type('test@')
    .should('have.value', 'test@');
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('.form textarea').type('test!')
    .should('have.value', 'test!');
    cy.get('.checkBtn').click();
    // TodoList에 Todo가 추가되었는지 확인
    cy.get('.items').should('have.length', 4); 
    cy.get('.items').should('contain', 'test@'); 
  })

})