/* ============================================================
   StudyMind — shared utilities
   ============================================================ */

// ── Inline SVG icons ────────────────────────────────────────
const Icons = {
  dashboard:    `<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  route:        `<svg class="icon" viewBox="0 0 24 24"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`,
  book:         `<svg class="icon" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  check:        `<svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  'check-square':`<svg class="icon" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
  trending:     `<svg class="icon" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  settings:     `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  help:         `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  bell:         `<svg class="icon" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  calendar:     `<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  search:       `<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  'chevron-right':`<svg class="icon" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`,
  'chevron-down': `<svg class="icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
  'chevron-left': `<svg class="icon" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`,
  'arrow-right':  `<svg class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  plus:         `<svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  x:            `<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  edit:         `<svg class="icon" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:        `<svg class="icon" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  sparkles:     `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>`,
  flame:        `<svg class="icon" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  target:       `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  alert:        `<svg class="icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  play:         `<svg class="icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  zap:          `<svg class="icon" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  'bar-chart':  `<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'refresh-cw': `<svg class="icon" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  'rotate-ccw': `<svg class="icon" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`,
  filter:       `<svg class="icon" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  eye:          `<svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  lock:         `<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  mail:         `<svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  user:         `<svg class="icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  'check-circle':`<svg class="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  clock:        `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'log-out':    `<svg class="icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

function icon(name, size = 18) {
  const svg = Icons[name];
  if (!svg) return '';
  return svg.replace('class="icon"', `class="icon" width="${size}" height="${size}"`);
}

// ── App State ────────────────────────────────────────────────
const State = {
  user: { name: 'Eduardo C.', initials: 'EC', plan: 'Pro · ENEM 2026' },

  subjects: [
    { id:1, name:'Math',       color:'#6366F1', color2:'#818CF8', init:'M',  accuracy:78, status:'track', topic:'Quadratic functions',   pct:78 },
    { id:2, name:'Physics',    color:'#38BDF8', color2:'#7DD3FC', init:'P',  accuracy:64, status:'track', topic:'Kinematics review',     pct:64 },
    { id:3, name:'Chemistry',  color:'#F472B6', color2:'#F9A8D4', init:'C',  accuracy:54, status:'risk',  topic:'Stoichiometry',         pct:32 },
    { id:4, name:'Biology',    color:'#10B981', color2:'#34D399', init:'B',  accuracy:71, status:'track', topic:'Cell respiration',      pct:71 },
    { id:5, name:'History',    color:'#F59E0B', color2:'#FBBF24', init:'H',  accuracy:60, status:'lag',   topic:'Vargas era',            pct:48 },
    { id:6, name:'Portuguese', color:'#A78BFA', color2:'#C4B5FD', init:'Pt', accuracy:82, status:'track', topic:'Reading comprehension', pct:82 },
  ],

  tasks: [
    { id:1, title:'Quadratic functions — practice set',  sub:'Math · Algebra · 20 questions',           subject:'Math',       priority:'high', time:'45m', done:false },
    { id:2, title:'Stoichiometry drills',                sub:'Chemistry · 12 problems',                 subject:'Chemistry',  priority:'high', time:'50m', done:false },
    { id:3, title:'Reading comprehension — 2 passages',  sub:'Portuguese · ENEM 2024 sample',           subject:'Portuguese', priority:'med',  time:'40m', done:false },
    { id:4, title:'Cell respiration — flashcards',       sub:'Biology · spaced repetition · due today', subject:'Biology',    priority:'med',  time:'15m', done:true  },
    { id:5, title:'Vargas era timeline — review',        sub:'History · 5 key events',                  subject:'History',    priority:'low',  time:'20m', done:true  },
    { id:6, title:'Kinematics — velocity problems',      sub:'Physics · 8 exercises',                   subject:'Physics',    priority:'med',  time:'30m', done:false },
    { id:7, title:'Trigonometry review',                 sub:'Math · functions · 15 questions',         subject:'Math',       priority:'low',  time:'35m', done:false },
    { id:8, title:'Periodic table memorization',         sub:'Chemistry · elements 1-36',               subject:'Chemistry',  priority:'low',  time:'20m', done:true  },
  ],

  roadmap: [
    { subject:'Math',       weeks:[ {label:'W1',done:true},{label:'W2',done:true},{label:'W3',done:true},{label:'W4',done:false},{label:'W5',done:false},{label:'W6',done:false} ], current:'Quadratic functions', next:'Exponential functions', pct:78 },
    { subject:'Physics',    weeks:[ {label:'W1',done:true},{label:'W2',done:true},{label:'W3',done:false},{label:'W4',done:false},{label:'W5',done:false},{label:'W6',done:false} ], current:'Kinematics', next:'Dynamics', pct:64 },
    { subject:'Chemistry',  weeks:[ {label:'W1',done:true},{label:'W2',done:false},{label:'W3',done:false},{label:'W4',done:false},{label:'W5',done:false},{label:'W6',done:false} ], current:'Stoichiometry', next:'Solutions', pct:32 },
    { subject:'Biology',    weeks:[ {label:'W1',done:true},{label:'W2',done:true},{label:'W3',done:true},{label:'W4',done:false},{label:'W5',done:false},{label:'W6',done:false} ], current:'Cell respiration', next:'Photosynthesis', pct:71 },
    { subject:'History',    weeks:[ {label:'W1',done:true},{label:'W2',done:true},{label:'W3',done:false},{label:'W4',done:false},{label:'W5',done:false},{label:'W6',done:false} ], current:'Vargas era', next:'Military dictatorship', pct:48 },
    { subject:'Portuguese', weeks:[ {label:'W1',done:true},{label:'W2',done:true},{label:'W3',done:true},{label:'W4',done:true},{label:'W5',done:false},{label:'W6',done:false} ], current:'Reading comprehension', next:'Text interpretation', pct:82 },
  ],

  performance: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    accuracy: [62, 65, 68, 64, 72, 75, 76],
    tasks:    [40, 55, 50, 70, 60, 75, 82],
    bySubject30d: { Math:78, Physics:64, Chemistry:54, Biology:71, History:60, Portuguese:82 },
  },
};

// ── Toast ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const ico = type === 'success' ? icon('check-circle',16) : icon('alert',16);
  toast.style.color = type === 'success' ? 'var(--emerald-400)' : '#FB7185';
  toast.innerHTML = `${ico} <span style="color:var(--fg-1)">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 200ms';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

// ── Modal helpers ────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('open');
    });
  });
}

// ── Sidebar builder ──────────────────────────────────────────
function buildSidebar(activeId) {
  const navItems = [
    { id:'dashboard',    label:'Dashboard',   ico:'dashboard',    href:'index.html' },
    { id:'roadmap',      label:'Roadmap',     ico:'route',        href:'roadmap.html',  badge:'12' },
    { id:'subjects',     label:'Subjects',    ico:'book',         href:'subjects.html' },
    { id:'tasks',        label:'Tasks',       ico:'check-square', href:'tasks.html',    badge:'5' },
    { id:'performance',  label:'Performance', ico:'trending',     href:'performance.html' },
  ];
  const settingsItems = [
    { id:'settings', label:'Settings', ico:'settings', href:'#' },
    { id:'help',     label:'Help',     ico:'help',     href:'#' },
  ];

  const navHTML = items => items.map(it => `
    <a href="${it.href}" class="nav__item${activeId === it.id ? ' active' : ''}">
      ${icon(it.ico)}
      <span>${it.label}</span>
      ${it.badge ? `<span class="nav__badge">${it.badge}</span>` : ''}
    </a>`).join('');

  return `
    <aside class="sidebar">
      <div class="sidebar__logo">
        <div class="sidebar__logo-mark">
          <svg viewBox="0 0 40 40" width="20" height="20" fill="none">
            <g stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22 L20 13 L28 22 L20 31 Z"/>
              <circle cx="12" cy="22" r="2.4" fill="#fff"/>
              <circle cx="28" cy="22" r="2.4" fill="#fff"/>
              <circle cx="20" cy="13" r="2.4" fill="#fff"/>
              <circle cx="20" cy="31" r="2.4" fill="#10B981" stroke="#10B981"/>
            </g>
          </svg>
        </div>
        <div class="sidebar__logo-text">Study<span>Mind</span></div>
      </div>
      <nav class="nav">
        <div class="nav__section-label">Workspace</div>
        ${navHTML(navItems)}
        <div class="nav__section-label">Account</div>
        ${navHTML(settingsItems)}
      </nav>
      <div class="sidebar__footer">
        <div class="sidebar__avatar">${State.user.initials}</div>
        <div>
          <div class="sidebar__user-name">${State.user.name}</div>
          <div class="sidebar__user-plan">${State.user.plan}</div>
        </div>
      </div>
    </aside>`;
}

// ── Topbar builder ───────────────────────────────────────────
function buildTopbar(section, page) {
  return `
    <header class="topbar">
      <div class="topbar__breadcrumb">
        <span>Workspace</span>
        ${icon('chevron-right', 14)}
        <b>${page}</b>
      </div>
      <div class="topbar__search">
        ${icon('search', 16)}
        <input placeholder="Search subjects, topics, tasks…"/>
        <span class="kbd">⌘K</span>
      </div>
      <div class="topbar__actions">
        <button class="topbar__icon-btn" title="Notifications">
          ${icon('bell', 16)}
          <span class="notif-dot"></span>
        </button>
        <button class="topbar__icon-btn" title="Calendar">
          ${icon('calendar', 16)}
        </button>
        <div class="topbar__user">
          <div class="topbar__user-avatar">${State.user.initials}</div>
          <div class="topbar__user-name">${State.user.name}</div>
          ${icon('chevron-down', 14)}
        </div>
      </div>
    </header>`;
}

// ── Tech strip ───────────────────────────────────────────────
function buildTechStrip() {
  return `
    <div class="tech-strip">
      <span class="tech-strip__label">Built with</span>
      <span class="tech-badge"><span class="bdot"></span>Java 17</span>
      <span class="tech-badge tech-badge--em"><span class="bdot"></span>Spring Boot</span>
      <span class="tech-badge tech-badge--rs"><span class="bdot"></span>PostgreSQL</span>
      <span class="tech-badge tech-badge--am"><span class="bdot"></span>JWT</span>
      <span class="tech-badge"><span class="bdot"></span>Flyway</span>
      <span class="spacer"></span>
      <span class="mono text-muted" style="font-size:11px">v2.4.1 · build 1284</span>
    </div>`;
}

// ── SVG Performance chart ────────────────────────────────────
function buildPerfChart(labels, acc, tasks, w = 600, h = 200) {
  const pad = 28;
  const xAt = i => pad + (i * (w - pad*2) / (labels.length - 1));
  const yAt = v => h - pad - ((v - 30) / 70) * (h - pad*2);
  const pathStr = arr => arr.map((v,i) => (i===0?'M':'L') + xAt(i).toFixed(1) + ' ' + yAt(v).toFixed(1)).join(' ');
  const areaStr = arr => pathStr(arr) + ` L ${xAt(arr.length-1).toFixed(1)} ${h-pad} L ${xAt(0).toFixed(1)} ${h-pad} Z`;
  return `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:100%;display:block">
      <defs>
        <linearGradient id="g-acc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366F1" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#6366F1" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="g-task" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${[0,1,2,3,4].map(i => {
        const y = (pad + i*(h-pad*2)/4).toFixed(1);
        return `<line x1="${pad}" x2="${w-pad}" y1="${y}" y2="${y}" stroke="rgba(148,163,184,0.08)"/>`;
      }).join('')}
      ${labels.map((l,i) => `<text x="${xAt(i).toFixed(1)}" y="${h-8}" text-anchor="middle" font-size="10" fill="#64748B" font-family="JetBrains Mono">${l}</text>`).join('')}
      <path d="${areaStr(acc)}" fill="url(#g-acc)"/>
      <path d="${areaStr(tasks)}" fill="url(#g-task)"/>
      <path d="${pathStr(acc)}" fill="none" stroke="#818CF8" stroke-width="2" stroke-linecap="round"/>
      <path d="${pathStr(tasks)}" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round"/>
      ${acc.map((v,i) => `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="3" fill="#0B0F1A" stroke="#818CF8" stroke-width="2"/>`).join('')}
      ${tasks.map((v,i) => `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="3" fill="#0B0F1A" stroke="#34D399" stroke-width="2"/>`).join('')}
    </svg>`;
}

// ── Roadmap row builder ──────────────────────────────────────
function buildRoadmapRows(subjects, full = false) {
  const statusLabel = { track:'On track', lag:'Lagging', risk:'At risk' };
  const statusClass = { track:'emerald', lag:'amber', risk:'rose' };
  return subjects.map(s => `
    <div class="roadmap__row">
      <div class="roadmap__icon" style="background:linear-gradient(135deg,${s.color},${s.color2})">${s.init}</div>
      <div>
        <div class="roadmap__name">${s.name}</div>
        <div class="roadmap__topic">${s.topic}</div>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${s.pct}%;background:linear-gradient(90deg,${s.color},${s.color2});box-shadow:0 0 12px ${s.color}55"></div>
      </div>
      <div class="roadmap__pct">${s.pct}%</div>
      <span class="badge badge--${statusClass[s.status]}">${statusLabel[s.status]}</span>
    </div>`).join('');
}

// ── Subject breakdown rows ───────────────────────────────────
function buildSubjectBreakdown(subjects) {
  return subjects.map(s => `
    <div class="subj-row">
      <span class="subj-name">${s.name}</span>
      <span class="subj-bar"><i style="width:${s.accuracy}%;background:linear-gradient(90deg,${s.color},${s.color}cc);box-shadow:0 0 10px ${s.color}55"></i></span>
      <span class="subj-pct">${s.accuracy}%</span>
    </div>`).join('');
}
