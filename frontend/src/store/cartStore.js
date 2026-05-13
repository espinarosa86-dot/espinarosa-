import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item._id === product._id);
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item._id === product._id 
              ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
              : item
          )
        };
      }
      return { items: [...state.items, { ...product, quantity: Math.min(quantity, product.stock) }] };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item._id !== productId)
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item => 
        item._id === productId 
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    }));
  },
  clearCart: () => set({ items: [] })
    }),
    {
      name: 'espinarosa-cart-storage',
    }
  )
);
