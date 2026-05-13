import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Sérum de Vitamina C', price: 25.99, isNewProduct: true, category: { name: 'Cuidado Facial' }, stock: 15, description: 'Un potente sérum antioxidante que ilumina y unifica el tono de la piel. Contiene 15% de vitamina C pura, ácido hialurónico y vitamina E.', rating: 4.8, numReviews: 124, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop' },
  { _id: '2', name: 'Crema Hidratante de Noche', price: 34.50, isNewProduct: false, category: { name: 'Cuidado Facial' }, stock: 5, description: 'Crema reparadora que trabaja mientras duermes. Hidratación profunda para amanecer con una piel suave y rejuvenecida.', rating: 4.5, numReviews: 89, image: 'https://images.unsplash.com/photo-1611077544766-3d2b27072670?w=500&auto=format&fit=crop' },
  { _id: '3', name: 'Paleta de Sombras Nude', price: 42.00, isNewProduct: true, category: { name: 'Maquillaje' }, stock: 20, description: '12 tonos altamente pigmentados desde mates suaves hasta metálicos deslumbrantes.', rating: 4.9, numReviews: 230, image: 'https://images.unsplash.com/photo-1512496115841-a45e560db40b?w=500&auto=format&fit=crop' },
  { _id: '4', name: 'Perfume Floral Elegance', price: 85.00, isNewProduct: false, category: { name: 'Perfumes' }, stock: 8, description: 'Fragancia sofisticada con notas de jazmín, rosa y sándalo.', rating: 4.7, numReviews: 56, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop' },
];

const INITIAL_CATEGORIES = [
  { _id: 'c1', name: 'Cuidado Facial' },
  { _id: 'c2', name: 'Maquillaje' },
  { _id: 'c3', name: 'Cuidado Corporal' },
  { _id: 'c4', name: 'Perfumes' }
];

export const useProductStore = create(
  persist(
    (set) => ({
      products: MOCK_PRODUCTS,
      categories: INITIAL_CATEGORIES,
  
  addProduct: (productData) => set((state) => ({
    products: [...state.products, {
      ...productData,
      _id: Date.now().toString(), // Mock ID
      isNewProduct: true,
      rating: 0,
      numReviews: 0,
      image: productData.image || 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop'
    }]
  })),

  updateProduct: (id, updatedData) => set((state) => ({
    products: state.products.map(product => 
      product._id === id ? { ...product, ...updatedData } : product
    )
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product._id !== id)
  })),

  decreaseStock: (items) => set((state) => {
    // items is an array of objects from cartStore: [{ _id, quantity }]
    let newProducts = [...state.products];
    items.forEach(cartItem => {
      newProducts = newProducts.map(p => 
        p._id === cartItem._id 
          ? { ...p, stock: Math.max(0, p.stock - cartItem.quantity) }
          : p
      );
    });
    return { products: newProducts };
  }),

  addCategory: (categoryName) => set((state) => ({
    categories: [...state.categories, { _id: Date.now().toString(), name: categoryName }]
  })),

  updateCategory: (id, newName) => set((state) => {
    // Also update all products that had this category name
    const oldCategory = state.categories.find(c => c._id === id);
    if (!oldCategory) return state;
    
    return {
      categories: state.categories.map(c => c._id === id ? { ...c, name: newName } : c),
      products: state.products.map(p => 
        p.category.name === oldCategory.name 
          ? { ...p, category: { ...p.category, name: newName } } 
          : p
      )
    };
  }),

  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(c => c._id !== id)
  }))
    }),
    {
      name: 'espinarosa-product-storage', // key in localStorage
    }
  )
);
