# Relatório Técnico — Frontend StudyMind

> Análise estática completa · leitura somente · nenhum arquivo foi modificado  
> Data da análise: 2026-05-10

---

## 1. Visão Geral do Frontend

### Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Markup | HTML5 semântico, `lang="pt-BR"` |
| Estilo | CSS puro (design tokens + utilitários + responsivo), sem pré-processador |
| Script | JavaScript vanilla (ES6+), sem framework ou bundler |
| Fontes | Google Fonts: Inter (sans-serif) + JetBrains Mono (monospace) |
| Ícones | SVG inline, baseados em Lucide Icons |
| Build | Nenhum — arquivos estáticos servidos diretamente |

### Estrutura de arquivos

```
frontend-study-mind/
├── index.html                  ← Dashboard (página raiz)
├── pages/
│   ├── login.html              ← Login + Cadastro
│   ├── subjects.html           ← Matérias & Tópicos
│   ├── tasks.html              ← Tarefas
│   ├── performance.html        ← Analytics de performance
│   └── roadmap.html            ← Roadmap ENEM
├── css/
│   ├── tokens.css              ← Design tokens (cores, espaçamentos, tipografia, sombras)
│   ├── base.css                ← Estilos base + componentes (@import tokens.css)
│   └── responsive.css          ← Breakpoints: 1100 / 900 / 768 / 480 / 360 px
└── js/
    └── shared.js               ← Utilitários compartilhados, Estado global, builders de HTML
```

### Arquitetura JavaScript

O projeto segue uma arquitetura de **renderização imperativa por substituição de innerHTML**. Cada página importa `shared.js` e chama uma função `render()` local que constrói toda a interface como string de template literal e injeta em `#app`. Não há reatividade real — re-renders são feitos chamando `render()` ou sub-funções específicas (ex: `renderTasks()`).

---

## 2. Páginas e Rotas

| Arquivo | Rota (navegador) | Conteúdo exibido |
|---|---|---|
| `index.html` | `/` ou `/index.html` | **Dashboard**: hero com plano do dia, 4 cards de estatísticas (streak, tarefas, acurácia, matéria mais fraca), roadmap resumido, gráfico SVG de performance, breakdown por matéria, lista de tarefas do dia, painel de insights de IA |
| `pages/login.html` | `/pages/login.html` | **Autenticação**: formulário de login (email + senha) e formulário de cadastro (nome, email, senha, exame alvo), alternados por abas. Inclui botão "Continue with Google" (stub) e indicador de força de senha |
| `pages/subjects.html` | `/pages/subjects.html` | **Matérias**: coluna de cards clicáveis por matéria + painel de tópicos com progresso e dificuldade. Modal para adicionar tópico |
| `pages/tasks.html` | `/pages/tasks.html` | **Tarefas**: barra de filtros (matéria, status, prioridade, ordenação), 4 cards de resumo, lista de tarefas completa com toggle e exclusão. Modal para criar tarefa |
| `pages/performance.html` | `/pages/performance.html` | **Analytics**: 4 cards de KPI, gráfico de linha SVG (7d/30d/90d), radar SVG por matéria, heatmap de atividade, painel de insights de IA |
| `pages/roadmap.html` | `/pages/roadmap.html` | **Roadmap**: 4 cards de progresso geral, timeline de 12 semanas por matéria em grid, cards detalhados por matéria (tópico atual, próximo, acurácia) |

---

## 3. Endpoints Consumidos

**Nenhum.** O frontend não realiza qualquer chamada HTTP. Não há nenhum `fetch()`, `XMLHttpRequest`, `axios` ou similar em nenhum dos arquivos. Todo o código que processa dados opera sobre o objeto `State` definido em `js/shared.js` com dados 100% hardcoded.

O tech strip exibido no rodapé de cada página menciona "Java 17 · Spring Boot · PostgreSQL · JWT · Flyway", mas nenhum desses sistemas é efetivamente consumido pelo frontend.

---

## 4. Autenticação

### Armazenamento do token JWT

**Nenhum token é armazenado.** Não há acesso a `localStorage`, `sessionStorage`, `cookie` ou cabeçalho `Authorization` em nenhum arquivo.

### Fluxo atual

O formulário de login (`pages/login.html`) executa validação **puramente client-side** (regex de email, campo obrigatório de senha) e, se válido, redireciona para `../index.html` via `window.location.href`. Nenhuma requisição é feita.

O formulário de cadastro segue o mesmo padrão: valida campos, redireciona para `../index.html`.

### Proteção de rotas

**Não existe.** Qualquer usuário pode acessar qualquer página sem estar autenticado. Não há verificação de token ou redirecionamento para login.

### Renovação de token

**Não implementada.** Sem token, não há refresh.

---

## 5. Formulários

### 5.1 Formulário de Login (`pages/login.html`)

| Campo | Tipo | ID | Validação |
|---|---|---|---|
| Email | `email` | `login-email` | Obrigatório, regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Senha | `password` | `login-pass` | Obrigatório (não vazio) |
| Manter logado | `checkbox` | — | Sem validação, sem efeito |

**Destino:** nenhum endpoint. Redireciona para `../index.html` em caso de sucesso client-side.

---

### 5.2 Formulário de Cadastro (`pages/login.html`)

| Campo | Tipo | ID | Validação |
|---|---|---|---|
| Nome completo | `text` | `reg-name` | Obrigatório (não vazio) |
| Email | `email` | `reg-email` | Obrigatório, regex de email |
| Senha | `password` | `reg-pass` | Mínimo 8 caracteres |
| Exame alvo | `select` | `reg-exam` | Sem validação; opções: ENEM 2026, FUVEST 2026, UNICAMP 2026, Other |

Exibe indicador de força da senha em tempo real (4 barras: fraca/regular/boa/forte).

**Destino:** nenhum endpoint. Redireciona para `../index.html` em caso de sucesso client-side.

---

### 5.3 Formulário de Nova Tarefa (`pages/tasks.html`)

| Campo | Tipo | ID | Validação |
|---|---|---|---|
| Título | `text` | `new-task-title` | Obrigatório (não vazio) |
| Matéria | `select` | `new-task-subject` | Sem validação; opções hardcoded |
| Prioridade | `select` | `new-task-priority` | Sem validação; valores: `high`, `med`, `low` |
| Tempo estimado | `text` | `new-task-time` | Sem validação (qualquer string, ex: "30m") |

**Destino:** nenhum endpoint. Insere objeto no array `State.tasks` em memória.

---

### 5.4 Formulário de Novo Tópico (`pages/subjects.html`)

| Campo | Tipo | ID | Validação |
|---|---|---|---|
| Matéria | `select` | `new-topic-subject` | Obrigatório (não vazio) |
| Nome do tópico | `text` | `new-topic-name` | Obrigatório (não vazio) |
| Dificuldade | `select` | `new-topic-diff` | Sem validação; valores: `easy`, `medium`, `hard` |

**Destino:** nenhum endpoint. Insere objeto no dicionário `topicsData[subject]` em memória.

---

## 6. Componentes e Reutilização

### Componentes reutilizáveis em `js/shared.js`

| Função | Retorno | Usado em |
|---|---|---|
| `buildSidebar(activeId)` | HTML string da sidebar com nav | Todas as páginas |
| `buildTopbar(section, page)` | HTML string da topbar com busca e usuário | Todas as páginas |
| `buildPerfChart(labels, acc, tasks, w, h)` | SVG inline do gráfico de linha | `index.html`, `performance.html` |
| `buildRoadmapRows(subjects)` | HTML das linhas de progresso por matéria | `index.html`, `roadmap.html` |
| `buildSubjectBreakdown(subjects)` | HTML das barras de acurácia por matéria | `index.html`, `performance.html` |
| `buildTechStrip()` | HTML do rodapé com stack tecnológico | Todas as páginas (exceto login) |
| `showToast(msg, type)` | Exibe toast flutuante | Todas as páginas |
| `openModal(id)` / `closeModal(id)` | Controla visibilidade de modais | `subjects.html`, `tasks.html` |
| `initModals()` | Registra listeners de fechar modal | `subjects.html`, `tasks.html`, `roadmap.html` |
| `initDrawer()` | Controla menu hamburguer mobile | Todas as páginas |
| `icon(name, size)` | SVG inline de ícone do catálogo `Icons` | Todas as páginas |

### Estado global

O objeto `State` em `shared.js` centraliza todos os dados mockados:
- `State.user` — nome, iniciais, plano
- `State.subjects` — 6 matérias com cor, acurácia, status, progresso, tópico atual
- `State.tasks` — 8 tarefas com título, sub-label, matéria, prioridade, tempo, status
- `State.roadmap` — progresso semanal por matéria (6 semanas cada)
- `State.performance` — arrays de labels e valores de accuracy/tasks para gráficos

### Organização do JavaScript por página

Cada página HTML possui um bloco `<script>` inline que:
1. Define dados locais (se houver)
2. Define funções de render e interação
3. Chama `render()` e `initDrawer()` na carga

---

## 7. Tratamento de Erros

### Erros de API
**Não existe.** Como não há chamadas de API, não há handlers para 401, 403, 404, 422 ou 500.

### Validação de formulários
Validação client-side básica com mensagens de erro inline (`.form-error.show`). Não há feedback de erros de servidor.

### Feedback ao usuário
- `showToast(msg, 'success')` — toast verde para ações bem-sucedidas
- `showToast(msg, 'error')` — toast vermelho para erros de validação
- Estado empty state na lista de tarefas quando filtros não retornam resultados

### Erros silenciosos
- `icon(name, size)` retorna string vazia se o ícone não existir (sem exceção)
- `State.roadmap.find()` retorna `undefined` com fallback para `|| {}` em `roadmap.html`
- Heatmap em `performance.html` usa `Math.random()` a cada render — dados não são determinísticos

---

## 8. Funcionalidades Ausentes — Backend não consumido

Com base no tech strip declarado (Spring Boot + JWT + PostgreSQL) e na natureza do produto, o backend provavelmente expõe os seguintes recursos que **o frontend não consome**:

| Domínio | Endpoint esperado | Status no frontend |
|---|---|---|
| Autenticação | `POST /auth/login` | Não implementado |
| Autenticação | `POST /auth/register` | Não implementado |
| Autenticação | `POST /auth/refresh` | Não implementado |
| Usuário | `GET /users/me` | Não implementado |
| Matérias | `GET /subjects` | Não implementado |
| Matérias | `POST /subjects` | Não implementado |
| Tópicos | `GET /subjects/{id}/topics` | Não implementado |
| Tópicos | `POST /subjects/{id}/topics` | Não implementado |
| Tópicos | `PATCH /topics/{id}` (marcar done) | Não implementado |
| Tarefas | `GET /tasks` | Não implementado |
| Tarefas | `POST /tasks` | Não implementado |
| Tarefas | `PATCH /tasks/{id}` | Não implementado |
| Tarefas | `DELETE /tasks/{id}` | Não implementado |
| Dashboard | `GET /dashboard` | Não implementado |
| Performance | `GET /performance?period=7d` | Não implementado |
| Roadmap | `GET /roadmap` | Não implementado |
| Roadmap | `POST /roadmap/recalibrate` | Não implementado |
| Diagnóstico | `GET /diagnostic` | Não implementado |
| Recomendação IA | `GET /recommendations` | Não implementado |
| Recomendação IA | `POST /recommendations/refresh` | Não implementado |

---

## 9. Campos Desalinhados — Frontend vs DTOs do Backend

### 9.1 Login

| Campo no frontend | ID do elemento | Campo esperado no backend |
|---|---|---|
| Email | `login-email` | `email` |
| Senha | `login-pass` | `password` |

O body seria `{ email, password }` — os nomes dos campos do body estão corretos em intenção, mas o código não monta o body pois não há fetch.

### 9.2 Cadastro

| Campo no frontend | Valor coletado | Campo esperado no backend | Problema |
|---|---|---|---|
| Nome | `reg-name` → `.value` | `name` ou `fullName` | Sem mapping definido |
| Email | `reg-email` → `.value` | `email` | OK |
| Senha | `reg-pass` → `.value` | `password` | OK |
| Exame alvo | `reg-exam` → `.value` = `"enem"` | `targetExam` ou `exam` | Opção `"other"` não mapeada para enum do backend |

### 9.3 Tarefa

| Campo no frontend (State.tasks) | Tipo | Campo provável no backend DTO | Desalinhamento |
|---|---|---|---|
| `id` | number | `id` (Long) | OK |
| `title` | string | `title` | OK |
| `sub` | string (label composto, ex: "Math · Algebra") | Não existe | Campo UI-only sem equivalente no backend |
| `subject` | string (nome, ex: "Math") | `subjectId` (Long) | **Crítico**: frontend usa nome, backend provavelmente usa ID |
| `priority` | `"high"`, `"med"`, `"low"` | `priority`: `HIGH`, `MEDIUM`, `LOW` | **Alto**: `"med"` ≠ `"MEDIUM"` |
| `time` | string livre ("45m", "—") | `estimatedMinutes` (Integer) | **Alto**: string vs número |
| `done` | boolean | `completed` ou `status` | **Médio**: nome diferente |

### 9.4 Tópico

| Campo no frontend (topicsData) | Tipo | Campo provável no backend | Desalinhamento |
|---|---|---|---|
| `name` | string | `name` ou `title` | Provável OK |
| `done` | boolean | `completed` / `status` | Médio: nome diferente |
| `diff` | `"easy"`, `"medium"`, `"hard"` | `difficulty`: `EASY`, `MEDIUM`, `HARD` | Médio: case diferente |

### 9.5 Estado global (user, subjects, roadmap)

Todo o objeto `State` é estático e não reflete a estrutura de DTOs do backend. Os dados de performance (accuracy, streak, tasks completed) são hardcoded com valores fixos e não carregam de nenhum endpoint.

---

## 10. Problemas Encontrados por Severidade

### CRÍTICO

| # | Problema |
|---|---|
| C1 | **Zero integração com API**: nenhum `fetch()` existe em todo o código. O frontend é um protótipo visual desconectado do backend. |
| C2 | **Autenticação completamente falsa**: login e cadastro apenas validam campos client-side e redirecionam para `index.html`. Nenhum token é gerado, armazenado ou enviado. |
| C3 | **Dados totalmente hardcoded**: subjects, tasks, roadmap, performance — todos os dados são literais no código-fonte, sem persistência. |
| C4 | **Sem proteção de rotas**: qualquer URL pode ser acessada sem autenticação; não há guard ou redirecionamento para login. |

### ALTO

| # | Problema |
|---|---|
| A1 | **Sem gestão de JWT**: nenhuma lógica de armazenamento (`localStorage`/`cookie`), envio em `Authorization: Bearer`, ou refresh token. |
| A2 | **Campo `priority` desalinhado**: frontend usa `"med"` mas backend Spring provavelmente usa enum `MEDIUM`. |
| A3 | **Campo `time` desalinhado**: frontend usa string livre ("45m") enquanto backend espera inteiro (minutos). |
| A4 | **Campo `subject` referenciado por nome**: frontend usa string "Math" onde backend usa provavelmente `subjectId` (Long). |
| A5 | **Sem tratamento de erros HTTP**: 401 (session expirada), 403, 404, 422 (validation), 500 — nenhum é capturado ou apresentado ao usuário. |

### MÉDIO

| # | Problema |
|---|---|
| M1 | **Google OAuth é stub**: o botão "Continue with Google" não tem handler, não faz nada ao clicar. |
| M2 | **"Forgot password" não implementado**: link com `href="#"`, sem fluxo de recuperação. |
| M3 | **Heatmap com dados aleatórios**: `performance.html` usa `Math.random()` para gerar o heatmap de atividade — dados mudam a cada render. |
| M4 | **Campo `sub` da tarefa é UI-only**: o label composto "Math · Algebra · 20 questions" não vem do backend e não pode ser reconstruído com os dados reais. |
| M5 | **Exame alvo sem enum mapeado**: opção `"other"` no cadastro não tem equivalente definido. |
| M6 | **Campo `done` vs `completed`**: nome diferente entre frontend e backend provável. |
| M7 | **Sidebar não reflete usuário real**: nome "Eduardo C." e plano "Pro · ENEM 2026" são literais no `State.user`. |

### BAIXO

| # | Problema |
|---|---|
| B1 | **Tech strip com versão hardcoded**: "v2.4.1 · build 1284" é literal, não lido de nenhuma API ou variável de build. |
| B2 | **Badges de navegação hardcoded**: Roadmap mostra "12" e Tasks mostra "5" — valores fixos, não refletem dados reais. |
| B3 | **Settings e Help sem conteúdo**: links na sidebar apontam para `href="#"`. |
| B4 | **Topbar search sem função**: o input de busca não filtra nada; tecla ⌘K não tem handler. |
| B5 | **Botão "Recalibrate" sem ação**: em `roadmap.html`, dispara sem chamar API. |
| B6 | **Botão "Export report" sem ação**: em `performance.html`, só dispara toast "Report exported!". |
| B7 | **"Start today's session" sem ação**: botão no dashboard dispara toast genérico. |
| B8 | **Detalhes de matéria com "coming soon"**: clique nos cards do roadmap exibe toast "details — coming soon". |

---

## 11. O Que Precisa Ser Criado do Zero

### Infraestrutura de API

- **Módulo de API client** (`js/api.js`): wrapper de `fetch` com:
  - `baseURL` configurável
  - Injeção automática de `Authorization: Bearer <token>` em cada requisição
  - Interceptor de 401 para redirecionar ao login
  - Tratamento centralizado de erros (422 com lista de erros de validação, 500 genérico)
- **Módulo de Auth** (`js/auth.js`):
  - `login(email, password)` → `POST /auth/login` → salva token em `localStorage`
  - `register(name, email, password, exam)` → `POST /auth/register`
  - `logout()` → limpa storage e redireciona
  - `refreshToken()` → `POST /auth/refresh`
  - `getToken()` / `isAuthenticated()` — helpers
  - Guard de rota: verificar token ao carregar cada página, redirecionar se ausente

### Telas e Fluxos

- **Fluxo de recuperação de senha**: "Forgot password?" → formulário de email → confirmação → nova senha
- **Tela de onboarding / configuração inicial**: escolha de exame, matérias e data-alvo após primeiro cadastro
- **Tela de Settings**: perfil do usuário, troca de senha, preferências de notificação, plano

### Integrações com Backend

- **Dashboard**: `GET /dashboard` → carregar streak, acurácia, tarefas pendentes, insights IA reais
- **Diagnóstico**: tela e integração com `GET /diagnostic` — endpoint de análise de pontos fracos
- **Recomendação IA**: consumir `GET /recommendations` e exibir no painel "AI insights" com dados reais (não textos hardcoded)
- **Roadmap gerado pelo backend**: `GET /roadmap` e `POST /roadmap/recalibrate` com lógica real de personalização

---

## 12. O Que Precisa Ser Adaptado

### `pages/login.html`

- Conectar `submit` do formulário de login a `POST /auth/login`
- Conectar `submit` do formulário de cadastro a `POST /auth/register`
- Salvar token retornado em `localStorage` (ou `httpOnly cookie` via backend)
- Exibir erros de validação do backend (422) nos campos corretos
- Implementar Google OAuth ou remover o botão

### `pages/tasks.html` — `addTask()`

- Substituir inserção em `State.tasks` por `POST /tasks` com body correto:
  ```json
  { "title": "...", "subjectId": 1, "priority": "MEDIUM", "estimatedMinutes": 30 }
  ```
- Ajustar `priority`: mapear `"med"` → `"MEDIUM"`
- Ajustar `time`: parsear string "30m" para inteiro `30`
- Ajustar `subject`: buscar `subjectId` pelo nome selecionado
- Substituir `done` por `completed` ou `status` na serialização

### `pages/tasks.html` — `toggleTask()` e `deleteTask()`

- Substituir mutação de `State.tasks` por `PATCH /tasks/{id}` e `DELETE /tasks/{id}`

### `pages/subjects.html` — `addTopic()` e `toggleTopicDone()`

- Conectar criação de tópico a `POST /subjects/{id}/topics`
- Conectar toggle de conclusão a `PATCH /topics/{id}`
- Ajustar `diff` de `"easy"/"medium"/"hard"` para `"EASY"/"MEDIUM"/"HARD"`

### `js/shared.js` — `State`

- Remover todos os dados hardcoded de `subjects`, `tasks`, `roadmap`, `performance`
- Converter `State` em objeto reativo ou simples store que é populado por chamadas de API
- `State.user` deve ser carregado de `GET /users/me` após autenticação

### `js/shared.js` — `buildSidebar()`

- Ler dados de usuário do token JWT (ou da API) em vez de `State.user` hardcoded
- Badges de contagem (Roadmap, Tasks) devem refletir dados reais da API

### `pages/performance.html` — `buildHeatmap()`

- Substituir `Math.random()` por dados reais de `GET /performance/heatmap` ou equivalente

### Todas as páginas (exceto `login.html`)

- Adicionar guard de autenticação no topo de cada `<script>`:
  ```js
  if (!isAuthenticated()) window.location.href = '/pages/login.html';
  ```
- Substituir dados mockados por carregamento via API com loading states e error states

---

## Resumo Executivo

O frontend do StudyMind é um **protótipo visual de alta fidelidade** com design system robusto, responsividade bem implementada e boa qualidade de código CSS/JS — mas é completamente desconectado de qualquer backend. A lacuna central é a **ausência total de integração com API**: zero chamadas HTTP, autenticação simulada, dados hardcoded e sem persistência.

Para transformar o protótipo em produto funcional, a prioridade deve ser:

1. **Criar o módulo de API + Auth** com gestão de JWT
2. **Conectar login/cadastro** ao backend real
3. **Proteger todas as rotas** com guard de autenticação
4. **Substituir `State` hardcoded** por carregamento via endpoints
5. **Alinhar campos de formulário** com DTOs do backend (especialmente `priority`, `time`, `subject`)
6. **Implementar tratamento de erros** para respostas 401, 422 e 500
