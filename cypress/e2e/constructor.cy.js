describe('Burger Constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as(
			'postOrder'
		);

		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);

		cy.visit('/');
	});

	it('should drag bun into constructor', () => {
		cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
		cy.get('[data-testid="burger-constructor"]').trigger('drop');

		cy.get('[data-testid="locked-constructor-element"]').should('exist');
	});

	it('should drag sauce into constructor', () => {
		cy.get('[data-testid="ingredient-card"]').eq(2).trigger('dragstart');
		cy.get('[data-testid="burger-constructor"]').trigger('drop');

		cy.get('[data-testid="draggable-constructor-element"]').should('exist');
	});

	it('should create order successfully', () => {
		cy.get('[data-testid="ingredient-card"]').first().trigger('dragstart');
		cy.get('[data-testid="burger-constructor"]').trigger('drop');
		cy.get('[data-testid="ingredient-card"]').eq(2).trigger('dragstart');
		cy.get('[data-testid="burger-constructor"]').trigger('drop');

		cy.get('[data-testid="order-button"]').click();

		cy.wait('@postOrder').then((interception) => {
			expect(interception.response.statusCode).to.eq(200);
			expect(interception.response.body).to.have.property('order');
		});

		cy.get('[data-testid="order-number"]').should('contain.text', '90271');
	});
});
