/* ============================================================
   StudyMind — API client
   ============================================================ */

const BASE_URL = 'http://localhost:8080';

async function api(method, path, body) {
  const token = localStorage.getItem('studymind_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw { type: 'network', message: 'Sem conexão com o servidor' };
  }

  if (response.status === 401) {
    localStorage.removeItem('studymind_token');
    localStorage.removeItem('studymind_usuario_id');
    localStorage.removeItem('studymind_usuario_nome');
    window.location.href = '/pages/login.html';
    throw { type: 'auth', message: 'Sessão expirada' };
  }

  if (response.status === 403) {
    throw { type: 'forbidden', message: 'Acesso negado' };
  }

  if (response.status === 404) {
    throw { type: 'notfound', message: 'Recurso não encontrado' };
  }

  if (response.status === 422) {
    const data = await response.json().catch(() => ({}));
    throw { type: 'validation', message: 'Erro de validação', errors: data };
  }

  if (response.status >= 500) {
    throw { type: 'server', message: 'Erro interno do servidor' };
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }

  return response.json();
}

function apiGet(path)             { return api('GET',    path); }
function apiPost(path, body)      { return api('POST',   path, body); }
function apiPut(path, body)       { return api('PUT',    path, body); }
function apiDelete(path)          { return api('DELETE', path); }
