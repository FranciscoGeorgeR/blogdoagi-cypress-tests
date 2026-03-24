/// <reference types="cypress" />

/**
 * ═══════════════════════════════════════════════════════════════════════════════
    SUITE: Smoke Tests - Pesquisa Blog do Agi
 *  Descrição: Conjunto mínimo de testes para validação rápida (smoke test)
 *             cobrindo os 2 cenários mais críticos solicitados no teste técnico.
 *
 *  CT-S01 | [CRÍTICO] Pesquisa com resultado válido
 *  CT-S02 | [CRÍTICO] Pesquisa sem resultado exibe feedback adequado
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const SearchPage = require("../support/pages/SearchPage")

describe("Smoke Tests - Pesquisa Blog do Agi", () => {
  beforeEach(() => {
    cy.visitHome()
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-S01 | Cenário mais relevante #1
  // Pesquisa com termo válido → exibe artigos relacionados
  // ─────────────────────────────────────────────────────────────────────────────
  it("CT-S01 | [SMOKE] Pesquisa com termo válido exibe artigos relevantes", () => {
    const term = "Investimentos"

    SearchPage.openSearchBar()
    cy.performSearch(term)

    SearchPage.getResultCount(term)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // CT-S02 | Cenário mais relevante #2
  // Pesquisa sem resultado → exibe mensagem informativa ao usuário
  // ─────────────────────────────────────────────────────────────────────────────
  it("CT-S02 | [SMOKE] Pesquisa sem resultado exibe mensagem de feedback ao usuário", () => {
    const invalidTerm = "xyzabcdefghijk123456789";

    SearchPage.openSearchBar()
    cy.performSearch(invalidTerm)

    SearchPage.assertNoResultsDisplayed(invalidTerm)

  })
});
