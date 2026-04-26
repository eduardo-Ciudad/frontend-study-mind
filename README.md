# StudyMind — Frontend

Interface web da plataforma **StudyMind**, um sistema de roadmap de estudos com IA para estudantes brasileiros de vestibular. Dark mode, design system próprio inspirado em Linear/Vercel/Stripe.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Markup | HTML5 semântico |
| Estilos | CSS3 com custom properties (design tokens) |
| Scripts | Vanilla JavaScript (ES2020+, sem frameworks) |
| Ícones | Inline SVG (sem dependências externas) |
| Fontes | Inter + JetBrains Mono via Google Fonts |

Sem build step, sem node_modules, sem bundler. Abre direto no navegador.

---

## Estrutura

```
studymind-frontend/
├── index.html                  # Dashboard principal
├── css/
│   ├── tokens.css              # Design tokens (cores, tipografia, espaçamento, sombras)
│   └── base.css                # Componentes compartilhados e reset
├── js/
│   └── shared.js               # State global, ícones SVG, builders de componentes
└── pages/
    ├── login.html              # Login e cadastro
    ├── roadmap.html            # Timeline de estudos por matéria
    ├── subjects.html           # Matérias e tópicos
    ├── tasks.html              # Lista de tarefas
    └── performance.html        # Analytics e desempenho
```

---

## Páginas

### `index.html` — Dashboard
Visão geral da jornada de estudos. Inclui hero com plano do dia gerado por IA, 4 stat cards (streak, tarefas, accuracy, matéria fraca), prévia do roadmap, gráfico de performance semanal, breakdown por matéria e lista de tarefas do dia.

### `pages/login.html` — Autenticação
Página de login e cadastro com tabs. Validação de formulário client-side, indicador de força de senha e redirecionamento para o dashboard após autenticação.

### `pages/roadmap.html` — Roadmap
Timeline visual de 12 semanas por matéria. Exibe semanas concluídas, semana atual em destaque e semanas futuras. Cards individuais por matéria com tópico atual, próximo tópico, accuracy e status.

### `pages/subjects.html` — Matérias & Tópicos
Sidebar com cards de matérias clicáveis. Painel lateral exibe os tópicos da matéria selecionada com toggle de conclusão, badge de dificuldade e modal para adicionar novos tópicos.

### `pages/tasks.html` — Tarefas
Lista completa de tarefas com filtros por matéria, status e prioridade, ordenação por prioridade ou nome, modal de criação de nova tarefa e ação de exclusão.

### `pages/performance.html` — Analytics
Métricas detalhadas de desempenho. Gráfico de linha com seletor de período (7d/30d/90d), breakdown de accuracy por matéria, radar SVG de cobertura por matéria, heatmap de atividade das últimas 12 semanas e AI insights.

---

## Design System

Todos os tokens visuais ficam em `css/tokens.css`. Importar esse arquivo é suficiente para ter acesso a todo o sistema de design.

### Paleta principal

| Token | Valor | Uso |
|-------|-------|-----|
| `--indigo-500` | `#6366F1` | Cor primária, CTAs, nav ativo |
| `--emerald-500` | `#10B981` | Acento, sucesso, progresso |
| `--bg-4` | `#1A2238` | Fundo de cards |
| `--fg-1` | `#F8FAFC` | Texto primário |
| `--fg-3` | `#94A3B8` | Texto secundário/labels |

### Paleta por matéria

```css
--subj-math:      #6366F1  /* índigo  */
--subj-physics:   #38BDF8  /* sky     */
--subj-chemistry: #F472B6  /* pink    */
--subj-biology:   #10B981  /* emerald */
--subj-history:   #F59E0B  /* amber   */
--subj-portuguese:#A78BFA  /* violet  */
```

### Raios de borda

| Token | Valor | Uso |
|-------|-------|-----|
| `--r-md` | `10px` | Botões, inputs, chips |
| `--r-xl` | `18px` | Cards secundários |
| `--r-2xl` | `22px` | Cards padrão |
| `--r-3xl` | `28px` | Hero, modais |

### Tipografia

- **Inter** — toda a UI (labels, body, headings)
- **JetBrains Mono** — números, badges, valores de métricas

---

## Componentes reutilizáveis (`js/shared.js`)

O arquivo `shared.js` expõe funções que montam HTML e são usadas em todas as páginas.

```js
// Sidebar com navegação ativa
buildSidebar('dashboard')

// Topbar com breadcrumb e ações
buildTopbar('Workspace', 'Dashboard')

// Linhas do roadmap com barra de progresso colorida
buildRoadmapRows(subjects)

// Barras horizontais de accuracy por matéria
buildSubjectBreakdown(subjects)

// Gráfico SVG de performance (duas séries)
buildPerfChart(labels, accuracy, tasks)

// Tech strip com badges Java/Spring Boot/etc
buildTechStrip()

// Toast de notificação
showToast('Mensagem', 'success' | 'error')

// Controle de modais
openModal('modal-id')
closeModal('modal-id')
```

### State global

Todos os dados fictícios ficam no objeto `State` dentro de `shared.js`. Ao integrar com o backend, substitua as propriedades por chamadas `fetch()` aos endpoints REST.

```js
State.subjects  // matérias com cor, accuracy, status, tópico atual
State.tasks     // lista de tarefas com prioridade, tempo, status
State.roadmap   // progresso semanal por matéria
State.performance // dados de série temporal para os gráficos
```

---

## Integração com o backend

O backend é uma API REST em Java 17 + Spring Boot. Endpoints esperados:

```
GET    /materias                    → DadosListagemMateria[]
GET    /materias/{id}               → DadosDetalhamentoMateria
POST   /materias                    → DadosDetalhamentoMateria
PUT    /materias/{id}               → DadosDetalhamentoMateria
DELETE /materias/{id}               → 204

GET    /topicos?materiaId={id}      → DadosListagemTopico[]
POST   /topicos                     → DadosDetalhamentoTopico
PUT    /topicos/{id}                → DadosDetalhamentoTopico

GET    /tarefas                     → DadosListagemTarefa[]
POST   /tarefas                     → DadosDetalhamentoTarefa
PUT    /tarefas/{id}                → DadosDetalhamentoTarefa
DELETE /tarefas/{id}                → 204

GET    /usuarios/{id}               → DadosDetalhamentoUsuario
POST   /usuarios                    → DadosDetalhamentoUsuario
PUT    /usuarios/{id}               → DadosDetalhamentoUsuario
```

Exemplo de substituição no `shared.js`:

```js
// Antes (mock)
const subjects = State.subjects;

// Depois (real)
const res = await fetch('/materias');
const subjects = await res.json();
```

---

## Como executar

Nenhuma instalação necessária. Basta abrir os arquivos no navegador:

```bash
# opção 1 — abrir direto
open index.html

# opção 2 — servidor local simples (recomendado para evitar CORS em fetch futuro)
npx serve .
# ou
python3 -m http.server 3000
```

Acesse `http://localhost:3000` e navegue pelo dashboard.

---

## Roadmap do projeto

- [x] Design system (tokens CSS)
- [x] Componentes base (sidebar, topbar, cards, modals, toasts)
- [x] Dashboard
- [x] Login / Cadastro
- [x] Roadmap semanal
- [x] Subjects & Topics
- [x] Tasks com filtros
- [x] Performance analytics
- [ ] Integração com API REST (Spring Boot)
- [ ] Autenticação JWT
- [ ] Responsividade mobile
- [ ] Dark/light mode toggle
- [ ] Internacionalização (PT-BR padrão)

---

## Backend

Repositório do backend em Java 17 + Spring Boot:
[github.com/educiudad](https://github.com/educiudad)