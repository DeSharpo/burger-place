describe('Ingredient Modal', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
		cy.visit('/');

		cy.get('[data-testid="ingredient-card"]').as('ingredientCard');
	});

	it('should open modal on ingredient click', () => {
		cy.get('@ingredientCard').first().click();
		cy.ingredientModal().should('exist');
	});

	it('should open and close modal by close button', () => {
		cy.get('@ingredientCard').first().click();
		cy.ingredientModal().should('exist');

		cy.get('[data-testid="modal-close"]').click();
		cy.ingredientModal().should('not.exist');
	});

	it('should open and close modal by ESC key', () => {
		cy.get('@ingredientCard').first().click();
		cy.ingredientModal().should('exist');

		cy.get('body').type('{esc}');
		cy.ingredientModal().should('not.exist');
	});
});
