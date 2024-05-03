describe('edit ', () => {
    beforeEach(() => {
        cy.exec('npm start');
        cy.visit('http://localhost:3000');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
    });

    it('TodoList에서 게시글을 누르면 수정', () => {
        cy.get('.items:eq(0)').click();
        //수정하다가 뒤로가기
        //제목 수정중일 때
        cy.get('.form input').type(' editing@');
        cy.get('[data-cy="returnBtn"]').click();  
        // confirm 창이 나타나는지 확인
        cy.on('window:confirm', (confirmText) => {
          expect(confirmText).to.equal('Are you sure you want to remove everything');
        });

        cy.get('.items:eq(0)').click();
        //description 입력중일 때
        cy.get('.form textarea').type(' editing@');
        cy.get('[data-cy="returnBtn"]').click();

        // confirm 창이 나타나지 않는지 확인
        cy.on('window:confirm', (confirmText) => {
            expect(confirmText).to.equal('Are you sure you want to remove everything');
        });
        //검색 후 게시글 누르면 수정
        cy.get('.items:eq(0)').click();
        cy.get('.form input').type(' editing@');
        cy.get('.form textarea').type(' editing@');
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-cy="submitBtn"]').click().then(() => {
            cy.get('.items:eq(0) .list_title').contains('editing@');
        });
    });

    it('검색하고 수정할때' , () => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get('[data-cy="addBtn"]').click().then(() => {
            cy.get('.form input').type('React@');
            cy.get('.form textarea').type('React@');
            cy.get('[data-cy="checkBtn"]').click();
        });
        cy.get('[data-cy="searchBtn"]').click();
        // 검색 값 입력
        cy.get('.search-wrap > input[type="text"]').type( 'React');
        cy.get('.items:eq(1)').click();
    });

});