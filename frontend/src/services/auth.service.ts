import { authApi } from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    userId: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout(): void {
    // Limpieza local si es necesaria
  },
}; 