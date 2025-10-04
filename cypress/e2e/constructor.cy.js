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

		cy.get('[data-testid="ingredient-card"]').as('ingredientCard');
		cy.get('[data-testid="burger-constructor"]').as('constructor');
		cy.get('[data-testid="order-button"]').as('orderButton');
	});

	it('should drag bun into constructor', () => {
		cy.get('@ingredientCard').first().trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('[data-testid="locked-constructor-element"]').should('exist');
	});

	it('should drag sauce into constructor', () => {
		cy.get('@ingredientCard').eq(2).trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('[data-testid="draggable-constructor-element"]').should('exist');
	});

	it('should create order successfully', () => {
		cy.get('@ingredientCard').first().trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.get('@ingredientCard').eq(2).trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('@orderButton').click();

		cy.wait('@postOrder').then((interception) => {
			expect(interception.response.statusCode).to.eq(200);
			expect(interception.response.body).to.have.property('order');
		});

		cy.get('[data-testid="order-number"]').should('contain.text', '90271');
	});
});
