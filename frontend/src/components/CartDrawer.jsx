import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const products = useProductStore(state => state.products);
  const decreaseStock = useProductStore(state => state.decreaseStock);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const getProductStock = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.stock : 0;
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = 'Hola, quiero realizar este pedido:\n\n';
    items.forEach(item => {
      message += `${item.name} x${item.quantity}\n`;
    });
    message += `\nTotal: ${formatPrice(totalPrice)}`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '573237321035'; // Updated to provided number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Decrease stock and clear cart
    decreaseStock(items);
    clearCart();

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col transition-colors duration-300"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Tu Carrito</h2>
              <button onClick={onClose} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-primary-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary-500"><X size={40} /></span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item._id} className="flex space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-gray-100 dark:border-gray-800" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatPrice(item.price)} c/u</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-primary-600"><Minus size={14} /></button>
                            <span className="px-2 text-sm font-medium dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => {
                                const maxStock = getProductStock(item._id);
                                if (item.quantity < maxStock) {
                                  updateQuantity(item._id, item.quantity + 1);
                                }
                              }} 
                              disabled={item.quantity >= getProductStock(item._id)}
                              className={`px-2 py-1 ${item.quantity >= getProductStock(item._id) ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400 hover:text-primary-600'}`}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item._id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white mb-6">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-primary-600 text-white py-4 rounded-full font-medium text-center hover:bg-primary-700 transition flex justify-center shadow-lg"
                >
                  Finalizar Pedido (WhatsApp)
                </button>
                <div className="mt-4 text-center">
                  <button onClick={onClose} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 font-medium">
                    o Continuar comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
