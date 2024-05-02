describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
//Todolist가 없으면 you have no todos가 나와야한다
//검색 중이 아니면 Todo전체목록이나와야한다.
//검색 중일시 해당 검색값에 따른 결과 Todo가 나와야한다.