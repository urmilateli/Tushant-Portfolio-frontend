import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token; // or just token
  }
  return config;
});

export default instance;
