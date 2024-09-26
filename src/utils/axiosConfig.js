import axios from 'axios';
import {store} from "../redux/store/index.js"; 

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

// Interceptor per le richieste, in modo da aggiungere automaticamente il token alle richieste
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().authenticate.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
