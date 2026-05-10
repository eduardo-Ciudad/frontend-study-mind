/* ============================================================
   StudyMind — Auth module
   ============================================================ */

function getToken()      { return localStorage.getItem('studymind_token'); }
function getUsuarioId()  { return localStorage.getItem('studymind_usuario_id'); }
function getUsuarioNome(){ return localStorage.getItem('studymind_usuario_nome'); }
function isAuthenticated(){ return !!getToken(); }

function checkAuth() {
  if (!isAuthenticated()) {
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? '/pages/login.html' : '/pages/login.html';
  }
}

function _saveSession(token, id, nome) {
  localStorage.setItem('studymind_token',       token);
  localStorage.setItem('studymind_usuario_id',  String(id));
  localStorage.setItem('studymind_usuario_nome', nome || '');
}

async function login(email, senha) {
  const data = await apiPost('/auth/login', { email, senha });
  // backend retorna { token } — o id do usuário virá no payload do JWT
  // ou pode vir como campo adicional; tentamos ambos
  const token = data.token;
  const id    = data.id || data.usuarioId || _parseJwtId(token);
  const nome  = data.nome || data.name || '';
  _saveSession(token, id, nome);
  return data;
}

async function registro(nome, email, senha) {
  const data = await apiPost('/auth/registro', { nome, email, senha });
  // após registro o backend pode retornar o usuário sem token;
  // se vier token, salva sessão — senão faz login automático
  if (data.token) {
    const id = data.id || data.usuarioId || _parseJwtId(data.token);
    _saveSession(data.token, id, nome);
  } else {
    // faz login para obter token
    await login(email, senha);
  }
  return data;
}

function logout() {
  localStorage.removeItem('studymind_token');
  localStorage.removeItem('studymind_usuario_id');
  localStorage.removeItem('studymind_usuario_nome');
  window.location.href = '/pages/login.html';
}

// Tenta extrair o `sub` (id) do payload JWT sem biblioteca externa
function _parseJwtId(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || payload.sub || null;
  } catch {
    return null;
  }
}
