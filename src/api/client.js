import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ctd_auth_token') || sessionStorage.getItem('ctd_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to normalize backend errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Backend returned an error response
      const data = error.response.data;
      const detail = data?.detail;

      // 401 on a protected call = expired/invalid token. Login/register/OTP
      // endpoints also return 401 for bad credentials, so leave /auth/* alone.
      const url = error.config?.url || '';
      if (
        error.response.status === 401 &&
        !(url.startsWith('/auth/') && !url.startsWith('/auth/me'))
      ) {
        for (const store of [localStorage, sessionStorage]) {
          store.removeItem('ctd_auth_token');
          store.removeItem('ctd_user');
        }
        if (window.location.pathname !== '/login') window.location.assign('/login');
      }

      // FastAPI: `detail` is a string, or an array of {msg} for 422
      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail) && detail[0]?.msg) {
        errorMessage = detail[0].msg;
      } else if (typeof data === 'string') {
        errorMessage = data;
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else if (data?.errors && Array.isArray(data.errors)) {
        errorMessage = data.errors[0];
      }
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = 'UNABLE TO CONNECT TO THE SERVER. PLEASE CHECK YOUR NETWORK CONNECTION.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  }
);
