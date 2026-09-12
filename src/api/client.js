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
      if (typeof data === 'string') {
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
