import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';
import { showSnackbar } from '../store/ui/uiSlice';
import type { RootState } from '../store/store';

const AUTH_API = import.meta.env.VITE_AUTH_API || 'https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/dev';
const TASK_API = import.meta.env.VITE_TASK_API || 'https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev';

const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Importante para CORS con API Gateway
};

export const authApi = axios.create({
  baseURL: AUTH_API,
  ...axiosConfig,
});

export const taskApi = axios.create({
  baseURL: TASK_API,
  ...axiosConfig,
});

// Request interceptor para agregar el token
taskApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState() as RootState;
    const token = state.auth.token;
    
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores
const handleApiError = (error: any) => {
  // Si es un error de CORS pero la petición fue exitosa, no mostramos error
  if (error.response?.status >= 200 && error.response?.status < 300) {
    return Promise.resolve(error.response);
  }

  // Si no hay respuesta del servidor (error de CORS o red)
  if (!error.response) {
    // Verificamos si la petición fue un DELETE
    if (error.config?.method === 'delete') {
      // Asumimos que la operación fue exitosa
      return Promise.resolve({ status: 200 });
    }
  }

  const message = error.response?.data?.error || 'Ha ocurrido un error';
  
  if (error.response?.status === 401) {
    store.dispatch(logout());
    store.dispatch(showSnackbar({ 
      message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      severity: 'error'
    }));
  } else if (error.response?.status !== 0) { // No mostrar error para errores de CORS
    store.dispatch(showSnackbar({ 
      message,
      severity: 'error'
    }));
  }
  
  return Promise.reject(error);
};

authApi.interceptors.response.use(
  response => response,
  handleApiError
);

taskApi.interceptors.response.use(
  response => response,
  handleApiError
); 