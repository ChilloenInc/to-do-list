describe('template spec', () => {
  beforeEach(() => {
    cy.exec('npm start');
  });
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
  })
  it('Todo입력하기', () => {
    cy.get('.addBtn').click();
    cy.get('.form input').type('제목');
    cy.get('.form textarea').type('글내용');
    cy.get('.checkImg').click();
    cy.get('input').should('not.have.value', 'US')
  })

//title, descripton입력하고 체크버튼 누르면 todolist에 추가
//추가 한 이후에 input은 빈 값으로 초기화
//title 혹은 description이 비어있으면 내용을 입력하세요 alert실행
//작성한상태로 뒤로가기 버튼 누르면 alert창이나오고 아니면 원래 목록으로 돌아간다.
//입력할때  onChange함수가 실행되어 실시간으로 value값이 나타나야함

})