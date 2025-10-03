describe('Ingredient Modal', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
		cy.visit('/');
	});

	it('should open modal on ingredient click', () => {
		cy.get('[data-testid="ingredient-card"]').first().click();
		cy.get('[data-testid="ingredient-modal"]').should('exist');
	});

	it('should open and close modal by close button', () => {
		cy.get('[data-testid="ingredient-card"]').first().click();
		cy.get('[data-testid="ingredient-modal"]').should('exist');

		cy.get('[data-testid="modal-close"]').click();
		cy.get('[data-testid="ingredient-modal"]').should('not.exist');
	});

	it('should open and close modal by ESC key', () => {
		cy.get('[data-testid="ingredient-card"]').first().click();
		cy.get('[data-testid="ingredient-modal"]').should('exist');

		cy.get('body').type('{esc}');
		cy.get('[data-testid="ingredient-modal"]').should('not.exist');
	});
});
