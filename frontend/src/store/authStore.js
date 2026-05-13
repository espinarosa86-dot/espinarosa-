import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // Si es null, no hay admin autenticado
  token: localStorage.getItem('token') || null,
  login: (userData, token) => {
    localStorage.setItem('token', token);
    set({ user: userData, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
