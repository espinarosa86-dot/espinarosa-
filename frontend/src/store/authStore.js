import { create } from 'zustand';
import api from '../utils/axios';

export const useAuthStore = create((set) => ({
  user: null, // Si es null, no hay admin autenticado
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('token', data.token);
      set({ user: data, token: data.token, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Error al iniciar sesión', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
