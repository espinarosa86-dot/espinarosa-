import { create } from 'zustand';
import api from '../utils/axios';

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/products');
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get('/categories');
      set({ categories: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      // API expects category to be an ID if it's referenced, or backend handles it.
      // Make sure productData matches what backend expects.
      const { data } = await api.post('/products', productData);
      set((state) => ({ products: [...state.products, data], isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateProduct: async (id, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  decreaseStock: async (items) => {
    // In a real app, this should be a transaction on the backend during order creation.
    // For this migration, we'll update each product individually via API.
    set({ isLoading: true, error: null });
    try {
      for (const item of items) {
        const product = get().products.find(p => p._id === item._id);
        if (product) {
          const newStock = Math.max(0, product.stock - item.quantity);
          await api.put(`/products/${item._id}`, { stock: newStock });
        }
      }
      await get().fetchProducts(); // Refresh products
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: async (categoryName) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/categories', { name: categoryName, description: '' });
      set((state) => ({ categories: [...state.categories, data], isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateCategory: async (id, newName) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.put(`/categories/${id}`, { name: newName });
      set((state) => ({
        categories: state.categories.map((c) => (c._id === id ? data : c)),
        isLoading: false,
      }));
      await get().fetchProducts(); // Refresh products to get updated category names
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((c) => c._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      throw error;
    }
  },
}));
