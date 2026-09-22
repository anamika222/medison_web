import axios from 'axios';

// Base URL নির্ধারণ (Vite বা CRA দুটোর জন্যই সেফগার্ড সহ)
const BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Custom Axios Instance তৈরি
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // ১০ সেকেন্ডের মধ্যে রেসপন্স না পেলে টাইমআউট হবে
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor (Header এ Authorization Token পাঠাতে বা Request ট্র্যাক করতে)
axiosInstance.interceptors.request.use(
  (config) => {
    // প্রয়োজন হলে LocalStorage থেকে Token এনে যোগ করতে পারেন
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

// Response Interceptor (Error Global ভাবে হ্যান্ডেল করতে)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global Error Handling (যেমন Unauthenticated/Unauthorized এর জন্য)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;