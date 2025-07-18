// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir automáticamente el token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (username: string, password: string) => {
  return api.post('/token/', { username, password });
};

export const getTransactions = () => {
  return api.get('/transactions/');
};

export const addTransaction = (data: any) => {
  return api.post('/transactions/', data);
};