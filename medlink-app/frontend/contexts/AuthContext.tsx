'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/auth';
import { authService } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  registerDoctor: (doctorData: any) => Promise<{ message: string; doctorId: number }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authResponse = await authService.login({ email, password });
      authService.setAuthData(authResponse);
      setUser(authResponse.user);
    } catch (error: any) {
      throw new Error(error.response?.data || 'Login failed');
    }
  };

  const register = async (userData: any) => {
    try {
      const authResponse = await authService.register(userData);
      authService.setAuthData(authResponse);
      setUser(authResponse.user);
    } catch (error: any) {
      throw new Error(error.response?.data || 'Registration failed');
    }
  };

  const registerDoctor = async (doctorData: any) => {
    try {
      const response = await authService.registerDoctor(doctorData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data || 'Doctor registration failed');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    registerDoctor,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
