import axios, { AxiosError } from 'axios';
import { API_CONFIG, logApiCall } from '../config/api.config';

export const challengeAPI = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api/challenge-content`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
challengeAPI.interceptors.request.use(
  (config) => {
    logApiCall(
      config.method?.toUpperCase() || 'REQUEST',
      config.url || '',
      config.data
    );
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
challengeAPI.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('❌ Network Error: No response from server');
      console.error('Check: 1) Server running 2) Correct IP 3) Same WiFi network');
    } else {
      // Request setup error
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);
