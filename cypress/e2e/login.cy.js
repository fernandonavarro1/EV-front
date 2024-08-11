describe('Login Page Tests', () => {

    // Visita la página de login antes de cada test
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should display the login form', () => {
      cy.get('h2').should('contain', 'Login');
      cy.get('input[type="text"]').should('have.attr', 'placeholder', 'E-mail');
      cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Password');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });
  
    it('should allow a user to log in and redirect to the panel', () => {
      // Simula la entrada de datos en el formulario de login
      cy.get('input[type="text"]').type('fnavarro@entrenavirtual.es');
      cy.get('input[type="password"]').type('12345678');
  
      // Envía el formulario
      cy.get('form').submit();
  
      // Verifica que se redirige a la página del panel
      cy.url().should('include', '/panel');
  
      // Verifica que los datos de usuario se muestran correctamente
      cy.get('h3').should('contain', 'Datos de usuario');
      cy.get('p').should('contain', 'Email: fnavarro@entrenavirtual.es');
    });
  
    it('should display an error message with incorrect credentials', () => {
      // Simula la entrada de datos incorrectos en el formulario de login
      cy.get('input[type="text"]').type('wronguser@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
  
      // Envía el formulario
      cy.get('form').submit();
  
      // Verifica que se muestra un mensaje de error
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Datos incorrectos');
      });
    });
  });
  
  describe('Panel Page Tests', () => {
    
    // Visita la página de login antes de cada test
    beforeEach(() => {
      // Simula el inicio de sesión
      cy.visit('/login');
      cy.get('input[type="text"]').type('fnavarro@entrenavirtual.es');
      cy.get('input[type="password"]').type('12345678');
      cy.get('form').submit();
      cy.url().should('include', '/panel');
    });
  
    it('should display the user data on the panel page', () => {
      cy.get('h3').should('contain', 'Datos de usuario');
      cy.get('p').should('contain', 'Email: fnavarro@entrenavirtual.es');
      cy.get('p').should('contain', 'Fecha de nacimiento:');
      cy.get('p').should('contain', 'Edad:');
    });
  
    it('should display an error message if the API request fails', () => {
      cy.intercept('GET', '/api/panel', {
        statusCode: 500,
        body: {
          message: 'Internal Server Error'
        },
      }).as('getUserData');
  
      cy.visit('/panel');
      cy.wait('@getUserData');
  
      cy.get('div').should('contain', 'Error al cargar los datos del perfil.');
    });
  });
  