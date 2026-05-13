import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Star, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const products = useProductStore(state => state.products);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  
  const product = products.find(p => p._id === id) || products[0];

  const handleAddToCart = () => {
    if (product) addItem(product, quantity);
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 mb-8 transition">
          <ChevronLeft size={16} className="mr-1" /> Volver a la tienda
        </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 p-8 flex items-center justify-center relative transition-colors duration-300">
          {product.isNewProduct && (
            <span className="absolute top-6 left-6 bg-primary-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
              NUEVO
            </span>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-full h-auto object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{product.category.name}</p>
          <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({product.numReviews} reseñas)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{formatPrice(product.price)}</p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 transition-colors duration-300">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition"
              >
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-primary-600 transition"
              >
                <Plus size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </p>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-primary-600 text-white py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/30 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="mr-2" /> 
            {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
