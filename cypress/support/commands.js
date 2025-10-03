// модалка
Cypress.Commands.add('ingredientModal', () => {
	return cy.get('[data-testid="ingredient-modal"]');
});
