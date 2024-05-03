describe('Search template', ()=>{
    beforeEach(() => {
        cy.exec('npm start');
        cy.visit('http://localhost:3000');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
    });
    it('검색 값 입력했을 떄 검색값에 해당하는 TodoList가 나와야한다.' , () => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-cy="addBtn"]').click().then(() => {
            cy.get('.form input').type('React@');
            cy.get('.form textarea').type('React@');
            cy.get('[data-cy="checkBtn"]').click();
        });
        cy.get('[data-cy="searchBtn"]').click();
        // 검색 값 입력
        cy.get('.search-wrap > input[type="text"]').type( 'React');
        //검색 중일시 해당 검색value에 따른 결과 TodoList가 나와야한다.
        cy.get('.items:eq(1) .list_title').should('contain', 'React'); 
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)
        //검색value가 없으면 Todo 전체목록이나와야한다.
        cy.get('.search-wrap > input[type="text"]').clear();
        cy.get('.items').should('have.length', 4); 
        //뒤로가기 버튼을 누르면 원래 목록으로 돌아온다.
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-cy="returnBtn"]').click().then(() => {
            cy.get('.items').should('have.length', 4); 
        });
    });
});