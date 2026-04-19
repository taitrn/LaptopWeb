import axios from 'axios';

// Base API configuration
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost/LaptopWeb/backend/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach token to every request automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      // If 401 (Unauthorized) or 403 (Forbidden), clear token and redirect
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Use window.location only if we need a hard redirect, 
        // normally we prefer handling this in AuthContext
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default axiosClient;
