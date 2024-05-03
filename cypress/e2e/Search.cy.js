describe(() => {
    beforeEach(() => {
        cy.exec('npm start');
        cy.visit('http://localhost:3000');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
    });

    it('검색 value에 따른 searchResult가 TodoList에 반영', () => {
        // 검색 값 입력
        const searchValue = 'React';
        cy.get('.search-wrap > input[type="text"]').type(searchValue);

        //검색 중일시 해당 검색value에 따른 결과 TodoList가 나와야한다.

        // 검색 값에 해당하는 Todo 항목만 필터링하여 선택
        cy.get('.items').filter((item) => {
            return item.text().includes(searchValue);
        }).should('exist');
        //검색value가 없으면 Todo 전체목록이나와야한다.

    });
});