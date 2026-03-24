// Page Object Model para a funcionalidade de pesquisa do Blog do Agi

class SearchPage {
  // ─── Seletores ───────────────────────────────────────────────────────────────

  get searchToggleButton() {
    return cy.get('[aria-label="Search button"]')
  }

  get searchResults() {
    return cy.get(
      '.search-results article, main article'
    ).filter(":visible");
  }

  // ─── Ações ───────────────────────────────────────────────────────────────────

  /**
   * Abre o campo de pesquisa via ícone de lupa
   */
  openSearchBar() {
    this.searchToggleButton.should('be.visible').click({ force: true });
    return this;
  }

  // ─── Asserções ───────────────────────────────────────────────────────────────

  /**
   * Verifica que a URL contém o parâmetro de busca
   * @param {string} term
   */
  assertUrlContainsSearchTerm(term) {
    cy.url().should("include", `?s=${encodeURIComponent(term)}`).or("include", `?s=${term}`);
    return this;
  }

  /**
   * Verifica que a lupa existe e está visível no header.
   */
  assertSearchIconVisible() {
    cy.get("a.slide-search.astra-search-icon")
      .should("exist")
      .and("be.visible");
    return this;
  }

  /**
   * Verifica que o input existe no DOM e aceita valor.
   */
  assertSearchInputAcceptsValue() {
    cy.get("input#search-field.search-field")
      .should("exist")
      .invoke("val", "teste")
      .invoke("val")
      .should("eq", "teste");
    return this;
  }

  /**
   * Verifica que existem resultados na página
   * @param {number} minCount - mínimo esperado de resultados
   */
  assertResultsExist(minCount = 1) {
    this.searchResults.should("have.length.at.least", minCount);
    return this;
  }

  /**
   * Verifica que a URL contém o parâmetro ?s= com o termo pesquisado.
   * @param {string} term
   */
  assertUrlHasSearchTerm(term) {
    cy.url().should("include", "?s=").and("include", term);
    return this;
  }

  /**
   * Verifica a mensagem de nenhum resultado encontrado
   */
  assertNoResultsDisplayed(invalidTerm) {
    cy.contains('Resultados encontrados para: ' + invalidTerm).should('be.visible');
    cy.contains('Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.').should('be.visible');

  }

  /**
   * Captura e retorna a quantidade de resultados exibidos
   */
  getResultCount(term) {
    cy.contains('Resultados encontrados para: ' + term).should('be.visible');
    cy.get('article').should('have.length.at.least', 1);
  }

  /**
  * Verifica que a página atual é uma página de artigo (não resultados de busca).
  */
  assertArticlePageLoaded() {
    cy.url().should("not.include", "?s=");
    cy.get("body").should("be.visible");
    cy.get("article, .post, .single-post, main .entry-content, .post-content").should("exist");
    return this;
  }

  /**
     * Clica no primeiro resultado da listagem e navega para o artigo.
     */
  clickFirstResult() {
    cy.get('article h2 a')
      .filter(":visible")
      .first()
      .then(($link) => {
        cy.log(`Navegando para: ${$link.text().trim()}`);
        cy.wrap($link).click();
      });
    return this;
  }
}

module.exports = new SearchPage();
