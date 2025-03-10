

export const API_BASE_URL =  'http://localhost:8000/api';

console.log(API_BASE_URL,'API_BASE_URLAPI_BASE_URL');


export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiClient = {

  async request(endpoint: string, options: RequestInit = {}) {

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include' as RequestCredentials,
    };

    let response = await fetch(`${API_BASE_URL}${endpoint}`, config);


    // Handle token refresh if needed
    if (response.status === 401) {
      try {
        // Try to refresh the token
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include'
        });

        if (refreshResponse.ok) {
          // If refresh successful, retry original request
          response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        } else {
          // If refresh fails, redirect to login
          window.location.href = '/accounts/login';
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.log(error);
        window.location.href = '/accounts/login';
        throw new Error('Authentication failed');
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  },

  get(endpoint: string, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint: string, data: unknown, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(endpoint: string, data: unknown, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};