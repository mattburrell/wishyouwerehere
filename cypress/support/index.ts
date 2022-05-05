/// <reference types="cypress" />

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      mockGeolocation(latitude?: number, longitude?: number): Chainable<any>;
    }
  }
}
