import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';
import { showSnackbar } from '../store/ui/uiSlice';
import type { RootState } from '../store/store';

const AUTH_API = import.meta.env.VITE_AUTH_API || 'https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/dev';
const TASK_API = import.meta.env.VITE_TASK_API || 'https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev';

// Error messages mapping
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  FORBIDDEN: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no existe.',
  SERVER_ERROR: 'Error en el servidor. Por favor, intenta más tarde.',
  DEFAULT: 'Ha ocurrido un error inesperado.',
  VALIDATION: 'Error de validación en los datos enviados.',
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: false,
};

export const authApi = axios.create({
  baseURL: AUTH_API,
  ...axiosConfig,
});

export const taskApi = axios.create({
  baseURL: TASK_API,
  ...axiosConfig,
});

// Request interceptor
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const state = store.getState() as RootState;
  const token = state.auth.token;
  
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  // Add timestamp to prevent caching
  config.params = {
    ...config.params,
    _t: Date.now(),
  };
  
  return config;
};

// Response interceptor
const responseErrorHandler = (error: unknown) => {
  // First check if it's an Axios error
  if (!axios.isAxiosError(error)) {
    store.dispatch(showSnackbar({
      message: ERROR_MESSAGES.DEFAULT,
      severity: 'error',
    }));
    return Promise.reject(error);
  }

  // Now we know it's an AxiosError
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  // Type assertion for AxiosError with our expected error response type
  interface ErrorResponse {
    error?: string;
  }

  const axiosError = error as AxiosError<ErrorResponse>;

  // Store response in a variable to avoid type issues
  const response = axiosError.response;

  if (!response) {
    store.dispatch(showSnackbar({
      message: ERROR_MESSAGES.NETWORK_ERROR,
      severity: 'error',
    }));
    return Promise.reject(axiosError);
  }

  const { status, data } = response;
  let errorMessage = ERROR_MESSAGES.DEFAULT;

  switch (status) {
    case 400:
      errorMessage = data?.error || ERROR_MESSAGES.VALIDATION;
      break;
    case 401:
      errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
      store.dispatch(logout());
      break;
    case 403:
      errorMessage = ERROR_MESSAGES.FORBIDDEN;
      break;
    case 404:
      errorMessage = ERROR_MESSAGES.NOT_FOUND;
      break;
    case 500:
      errorMessage = ERROR_MESSAGES.SERVER_ERROR;
      break;
    default:
      if (data?.error) {
        errorMessage = data.error;
      }
  }

  store.dispatch(showSnackbar({
    message: errorMessage,
    severity: 'error',
  }));

  return Promise.reject(axiosError);
};

// Apply interceptors to both APIs
[authApi, taskApi].forEach(api => {
  api.interceptors.request.use(requestInterceptor, Promise.reject);
  api.interceptors.response.use(
    response => response,
    responseErrorHandler
  );
});

// Request cancellation
export const createCancelToken = () => {
  return axios.CancelToken.source();
};

// Retry failed requests
export const retryRequest = async (
  apiCall: () => Promise<any>,
  maxRetries = 3,
  delay = 1000
): Promise<any> => {
  let lastError: AxiosError | unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Don't retry on authentication errors
        break;
      }
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  
  return Promise.reject(lastError);
}; 