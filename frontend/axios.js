import axios from 'axios';

// Fallback হিসেবে সরাসরি Relative path '/api' রাখা হলো
const BASE_URL = process.env.REACT_APP_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api');

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;