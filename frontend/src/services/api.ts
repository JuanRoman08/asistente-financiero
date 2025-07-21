import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

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

export default api;