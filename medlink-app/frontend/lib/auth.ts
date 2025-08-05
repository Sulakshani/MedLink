import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, RegisterDoctorRequest, User } from '../types/auth';

const API_BASE_URL = 'http://localhost:5079/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // User login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // User registration
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Doctor registration
  async registerDoctor(doctorData: RegisterDoctorRequest): Promise<{ message: string; doctorId: number }> {
    const response = await api.post('/auth/register-doctor', doctorData);
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  // Get stored user
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Store auth data
  setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  },
};

export default api;
