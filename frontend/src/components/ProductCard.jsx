import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    addItem(product, 1);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop"} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {product.isNewProduct && (
          <span className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
            NUEVO
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-primary-500 mb-1">{product.category?.name || 'Categoría'}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary-600 transition truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-2 rounded-full hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
