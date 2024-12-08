describe('Navigation Tests', () => {
  const publicRoutes = [
    { path: '/', name: 'Home' },
    { path: '/about-us', name: 'About Us' },
    { path: '/sign-up', name: 'Sign Up' },
    { path: '/login', name: 'Login' },
  ];

  const authRoutes = [
    { path: '/profile', name: 'Profile' },
    { path: '/events', name: 'Events' },
    { path: '/events/67343a3d6d5b2456846cabbe', name: 'Event Details' }, // Example dynamic route
  ];

  const testNavigation = (route) => {
    it(`should navigate to the ${route.name} page`, () => {
      cy.visit(route.path);
      // Verify the URL
      cy.url().should('include', route.path);
    });
  };

  context('Public Routes', () => {
    publicRoutes.forEach(testNavigation);
  });

    context('When Authenticated', () => {
      beforeEach(() => {
        // Simulate login (adjust to match your app's login flow)
        cy.setCookie('authToken', 'dummy-token'); // Replace with actual login logic
      });

      authRoutes.forEach(testNavigation);
    });
  });

