// ***********************************************
// cypress/support/commands.js
// ***********************************************

/**
 * Navega para a home do blog e aguarda carregamento completo.
 */
Cypress.Commands.add("visitHome", () => {
  cy.visit("/", {
    timeout: 30000,
    failOnStatusCode: false,
  });

  cy.window().then((win) => win.sessionStorage.clear())

  cy.document().its("readyState").should("eq", "complete")

  cy.get("a.slide-search.astra-search-icon")
    .should("exist")
    .and("be.visible")
});

Cypress.Commands.add("openSearchBar", () => {
  cy.log("Abrindo barra de pesquisa");

  cy.get("a.slide-search.astra-search-icon")
    .should("be.visible")
    .click({ force: true });

  cy.get(".ast-search-menu-icon").should("have.class", "ast-dropdown-active");

  cy.wait(600);

  cy.get("input#search-field.search-field").should("exist");
});

Cypress.Commands.add("performSearch", (term) => {
  cy.get("input#search-field.search-field")
    .invoke("val", term)         
    .trigger("input", { force: true })  
    .type("{enter}", { force: true })
});

Cypress.Commands.add("assertSearchResultsPage", () => {
  cy.url().should("include", "?s=");
});

Cypress.Commands.add("assertHasResults", () => {
  cy.get('article, .post, .entry, [class*="post-"], .search-results article')
    .filter(":visible")
    .should("have.length.at.least", 1);
});

Cypress.Commands.add("assertNoResults", () => {
  cy.get("body").should(($body) => {
    const text = $body.text().toLowerCase();
    expect(
      text.includes("nenhum resultado") ||
      text.includes("no results") ||
      text.includes("não encontrou") ||
      text.includes("nothing found") ||
      text.includes("nenhuma publicação") ||
      text.includes("0 resultado"),
      "Mensagem de nenhum resultado encontrada"
    ).to.be.true;
  });
});
