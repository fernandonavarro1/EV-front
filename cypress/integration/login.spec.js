describe('Login Page', () => {
    it('should display the login form', () => {
      cy.visit('/login');
      cy.get('form').should('be.visible');
    });
  });