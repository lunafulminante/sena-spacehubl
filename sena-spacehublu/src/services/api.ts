// =================================================================
// Archivo: src/services/api.ts
//RESPONSABILIDAD: Helper central HTTP que adjunta automáticamente el token JWT
//desde sessionStorage y maneja las URLs base utilizando VITE_API_URL.
// =================================================================
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = sessionStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  } catch {
    throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.');
  }

  const data = await response.json().catch(() => null);

  if (response.status === 401 && token && !endpoint.startsWith('/auth/')) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.assign('/login');
  }

  if (!response.ok) {
    const message = Array.isArray(data?.message) ? data.message.join(', ') : data?.message;
    throw new Error(message || `Error en la comunicación con la API REST (HTTP ${response.status} en ${endpoint})`);
  }
  return data as T;
}
