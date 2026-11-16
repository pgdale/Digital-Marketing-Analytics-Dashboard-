import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Traffic API
export const trafficAPI = {
  get: () => api.get('/traffic'),
  add: (data) => api.post('/traffic', data),
};

// Revenue API
export const revenueAPI = {
  get: () => api.get('/revenue'),
  add: (data) => api.post('/revenue', data),
};

// Campaign API
export const campaignAPI = {
  get: (page = 1, limit = 5) => api.get(`/campaigns?page=${page}&limit=${limit}`),
  add: (data) => api.post('/campaigns', data),
};

// Support API
export const supportAPI = {
  get: () => api.get('/support'),
  add: (data) => api.post('/support', data),
};

export default api;