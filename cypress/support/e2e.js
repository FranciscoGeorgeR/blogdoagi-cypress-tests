// ***********************************************************
// cypress/support/e2e.js
// ***********************************************************

require("./commands");
require("@shelex/cypress-allure-plugin");

Cypress.on("uncaught:exception", () => false);

// ─── Limpeza de estado entre testes ──────────────────────────────────────────
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
