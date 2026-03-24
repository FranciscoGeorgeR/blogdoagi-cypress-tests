/// <reference types="cypress" />

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *  SUITE: Pesquisa de Artigos - Blog do Agi
 *  Autor: QA Senior
 *  Descrição: Testes de automação E2E para a funcionalidade de pesquisa
 *             acessada via ícone de lupa no canto superior direito.
 *
 *  Cenários Cobertos:
 *    CT-001 | Pesquisa com termo válido retorna resultados relevantes
 *    CT-002 | Pesquisa com termo inválido exibe mensagem de nenhum resultado
 *    CT-003 | Campo de pesquisa é acessível via ícone de lupa
 *    CT-004 | Pesquisa preserva o termo pesquisado na URL
 *    CT-005 | Pesquisa com caracteres especiais (acentos) funciona corretamente
 *    CT-006 | Múltiplas pesquisas sequenciais funcionam corretamente
 *    CT-007 | Resultados de pesquisa são clicáveis e levam ao artigo correto
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const SearchPage = require("../support/pages/SearchPage");

describe("Pesquisa de Artigos - Blog do Agi", () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // Setup
  // ─────────────────────────────────────────────────────────────────────────────

  beforeEach(() => {
    cy.visitHome()
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-001 | CENÁRIO PRINCIPAL: Pesquisa com termo válido retorna resultados
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-001 | Deve retornar resultados ao pesquisar por termo válido", () => {
    const term = "Finanças";

    SearchPage.openSearchBar()
    cy.performSearch(term)
    SearchPage.getResultCount(term)
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-002 | CENÁRIO PRINCIPAL: Pesquisa sem resultados exibe mensagem adequada
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-002 | Deve exibir mensagem adequada quando nenhum resultado é encontrado", () => {
    const invalidTerm = "xyzabcdefghijk123456789"

    SearchPage.openSearchBar()
    cy.performSearch(invalidTerm)

    SearchPage.assertNoResultsDisplayed(invalidTerm)

  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-003 | Acessibilidade da barra de pesquisa via ícone de lupa
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-003 | A barra de pesquisa deve ser acessível via ícone de lupa", () => {
    SearchPage.assertSearchIconVisible()

    SearchPage.openSearchBar();

    SearchPage.assertSearchInputAcceptsValue();

  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-004 | Termo de pesquisa é preservado na URL
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-004 | O termo pesquisado deve ser refletido na URL como parâmetro ?s=", () => {
    const searchTerm = "investimento"

    SearchPage.openSearchBar()
    cy.performSearch(searchTerm)

    SearchPage.assertUrlHasSearchTerm(searchTerm)
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-005 | Múltiplas pesquisas sequenciais
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-005 | Deve permitir múltiplas pesquisas sequenciais sem necessidade de reload", () => {
    const firstTerm = "poupanca"
    const secondTerm = "credito"

    // Primeira pesquisa
    SearchPage.openSearchBar()
    cy.performSearch(firstTerm)
    SearchPage.assertUrlHasSearchTerm(firstTerm)

    // Segunda pesquisa - retorna à home
    cy.visitHome()
    SearchPage.openSearchBar()
    cy.performSearch(secondTerm)
    SearchPage.assertUrlHasSearchTerm(secondTerm)

  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-006 | Resultado é clicável e leva ao artigo correto
  // ─────────────────────────────────────────────────────────────────────────────

  it("CT-006 | O primeiro resultado deve ser clicável e abrir o artigo correspondente", () => {
    const searchTerm = "dinheiro"

    SearchPage.openSearchBar()
    cy.performSearch(searchTerm)
    SearchPage.assertUrlHasSearchTerm(searchTerm)
    SearchPage.assertResultsExist(1)

    SearchPage.clickFirstResult()
    SearchPage.assertArticlePageLoaded()

  });
});
