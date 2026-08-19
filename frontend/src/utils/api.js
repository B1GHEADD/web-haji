import axios from 'axios';

/**
 * Instance axios terpusat.
 * Base URL diambil dari environment variable VITE_API_URL.
 * - Development : .env          → http://localhost:5000
 * - Production  : .env.production → URL server/VPS backend
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
