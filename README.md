# 🔍 Blog do Agi — Automação de Testes E2E

[![Cypress Tests](https://img.shields.io/badge/Tested%20with-Cypress-04C38E?logo=cypress)](https://www.cypress.io/)
[![Allure Report](https://img.shields.io/badge/Report-Allure-yellow)](https://allurereport.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![CI/CD](https://img.shields.io/badge/CI-GitHub%20Actions-blue?logo=github-actions)](https://github.com/features/actions)

> Projeto de automação de testes E2E para a funcionalidade de **pesquisa de artigos** do [Blog do Agi](https://blogdoagi.com.br/), desenvolvido com **Cypress** e relatórios **Allure**.

---

## Índice

- [Cenários de Teste](#-cenários-de-teste)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução dos Testes](#-execução-dos-testes)
- [Relatório Allure](#-relatório-allure)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Decisões Técnicas](#-decisões-técnicas)

---

##  Cenários de Teste

### Cenários Principais (Smoke)

| ID | Cenário | Prioridade |
|----|---------|------------|
| CT-S01 | Pesquisa com termo válido retorna artigos relevantes | 🔴 Blocker |
| CT-S02 | Pesquisa com termo inválido exibe mensagem de nenhum resultado | 🔴 Blocker |

### Cenários Complementares (Regressão)

| ID | Descrição | Prioridade |
|----|-----------|------------|
| CT-001 | Pesquisa com termo válido retorna resultados relevantes | 🔴 Crítico |
| CT-002 | Pesquisa com termo inválido não exibe artigos | 🔴 Crítico |
| CT-003 | Barra de pesquisa é acessível via ícone de lupa | 🟡 Normal |
| CT-004 | Termo pesquisado é refletido na URL como `?s=` | 🟡 Normal |
| CT-005 | Múltiplas pesquisas sequenciais funcionam corretamente | 🟡 Normal |
| CT-006 | Primeiro resultado é clicável e abre o artigo correto | 🔴 Crítico |

### Por que esses dois cenários são os mais relevantes?
 
**CT-S01 — Pesquisa com resultado:** representa o *happy path* da funcionalidade principal. Se um usuário não consegue encontrar artigos ao pesquisar, o propósito central do blog está comprometido.
 
**CT-S02 — Pesquisa sem resultado:** garante que o sistema se comporta corretamente em um cenário comum — quando nenhum artigo é encontrado, nenhum resultado deve ser exibido, evitando confusão para o usuário.
 
---

## Pré-requisitos

| Ferramenta | Versão mínima | Download |
|------------|--------------|---------|
| Node.js | 18.x | [nodejs.org](https://nodejs.org/) |
| npm | 9.x | Incluído com Node.js |
| Java (Allure) | 11+ | [Java JDK 11](https://www.oracle.com/br/java/technologies/javase/jdk11-archive-downloads.html) |
| Allure CLI | 2.x | Ver seção de instalação |

> **Nota:** Java é necessário apenas para gerar e visualizar o relatório Allure localmente.

---

## Instalação

### 1. Clone o repositório

```bash
git clone git@github.com:FranciscoGeorgeR/blogdoagi-cypress-tests.git
cd blogdoagi-cypress-tests
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Instale o Allure CLI (necessário para relatórios)

**macOS (Homebrew):**
```bash
brew install allure
```

**Linux (curl):**
```bash
curl -o allure-2.27.0.tgz -Ls https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.27.0/allure-commandline-2.27.0.tgz
sudo tar -zxvf allure-2.27.0.tgz -C /opt/
sudo ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure
```

**Windows (Scoop):**
```powershell
scoop install allure
```

**Via npm (alternativa cross-platform):**
```bash
npm install -g allure-commandline
```

---

## Execução dos Testes

### Modo Interativo (Cypress UI)

```bash
npm run cy:open
```

### Modo Headless (linha de comando)

```bash
# Todos os testes
npm run cy:run

# Somente smoke tests (mais rápido)
npx cypress run --spec "cypress/e2e/search.smoke.cy.js"

# Somente regressão completa
npx cypress run --spec "cypress/e2e/search.cy.js"

# Com Chrome explicitamente
npm run cy:run:chrome

# Com Firefox
npm run cy:run:firefox
```

### Executar e Gerar Relatório em um comando

```bash
npm test
```

---

## Relatório Allure

### Gerar e abrir o relatório

```bash
# Após executar os testes:
npm run allure:generate   # gera o relatório em allure-report/
npm run allure:open       # abre no navegador

# Ou, servir dinamicamente (sem gerar antes):
npm run allure:serve
```

### O relatório inclui:
- ✅ Status de cada teste (passou/falhou/pulado)
- 📋 Passos detalhados de cada cenário (BDD-style)
- 📸 Screenshots automáticos em caso de falha
- 🎬 Vídeo de cada execução
- 📈 Histórico de execuções (trends)
- 🏷️ Categorias por Epic / Feature / Story / Severity

---

## Estrutura do Projeto

```
blogdoagi-cypress-tests/
│
├── .github/
│   └── workflows/
│       └── cypress-tests.yml      # Pipeline GitHub Actions
│
├── cypress/
│   ├── e2e/
│   │   ├── search.cy.js           # Suite completa (6 cenários)
│   │   └── search.smoke.cy.js     # Smoke tests (2 cenários críticos)
│   │
│   └── support/
│       ├── commands.js            # Comandos customizados Cypress
│       ├── e2e.js                 # Configuração global de testes
│       └── pages/
│           └── SearchPage.js      # Page Object - Pesquisa
│
├── allure-results/                # Gerado após execução (gitignored)
├── allure-report/                 # Gerado pelo allure generate (gitignored)
│
├── .gitignore
├── cypress.config.js              # Configuração Cypress + Allure
├── package.json
└── README.md
```

### Padrões e Boas Práticas Adotadas

| Padrão | Aplicação |
|--------|-----------|
| **Page Object Model (POM)** | `SearchPage.js` encapsula seletores e ações |
| **Custom Commands** | `commands.js` com ações reutilizáveis |
| **BDD (Dado/Quando/Então)** | Passos Allure seguem Gherkin |
| **Retry automático** | 2 retries em `runMode` para flakiness |
| **Seletores resilientes** | Múltiplos fallbacks por seletor |
| **Variáveis de ambiente** | Termos de busca configuráveis via `cypress.config.js` |
| **Tags de teste** | `@smoke`, `@critical`, `@regression`, `@ui` |

---

## Pipeline CI/CD

O projeto possui pipeline **GitHub Actions** configurado em `.github/workflows/cypress-tests.yml`.

### Gatilhos:
- Push nas branches `main`, `master`, `develop`
- Pull Requests
- Execução agendada (diariamente às 08:00 UTC)
- Execução manual via `workflow_dispatch`

### O pipeline:
1. ✅ Roda testes em **Chrome** e **Firefox** (em paralelo)
2. 📊 Gera relatório Allure
3. 📤 Publica artefatos (resultados, vídeos, screenshots)
4. 🌐 Faz deploy do Allure Report no **GitHub Pages** (branch `main`)

### Para ver o relatório online:
Após a primeira execução, o relatório estará disponível em:

🔗 **[Ver Relatório Allure](https://franciscogeorger.github.io/blogdoagi-cypress-tests/)**


---

## Decisões Técnicas

### Por que Cypress?
- Execução nativa no browser, sem WebDriver
- Hot-reload e debugging visual excelentes
- Retry automático de asserções
- Comunidade ampla e documentação rica

### Por que Allure?
- Relatórios visuais ricos com histórico de tendências
- Suporte nativo a BDD (Epic/Feature/Story)
- Integração simples com `@shelex/cypress-allure-plugin`
- Fácil publicação via GitHub Pages

### Por que Page Object Model?
- Separação clara entre lógica de teste e mapeamento de UI
- Reutilização de código (DRY)
- Manutenção simplificada: mudança no seletor = 1 lugar para alterar

---

## Autor

Francisco George Rodrigues de Sousa<br>
Analista de Qualidade / QA Automation
