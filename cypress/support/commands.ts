Cypress.Commands.add('mockGeolocation', (latitude = 30, longitude = -98) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, 'getCurrentPosition').callsFake(
      (callback) => callback({ coords: { latitude, longitude } }),
    );
  });
});
