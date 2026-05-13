import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, Moon, Sun } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenCart }) {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const { isDark, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold text-primary-600">
              EspinaRosa
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium transition">Inicio</Link>
            <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium transition">Tienda</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 font-medium transition">Nosotros</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <form onSubmit={handleSearch} className="hidden md:flex relative items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..." 
                className="pl-8 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-full focus:ring-1 focus:ring-primary-500 focus:outline-none w-48 transition-all dark:text-white"
              />
              <Search size={16} className="absolute left-2.5 text-gray-500 dark:text-gray-400" />
            </form>
            <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition">
              <User size={20} />
            </Link>
            <button onClick={onOpenCart} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary-500 transition"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition font-medium">Inicio</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition font-medium">Tienda</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition font-medium">Nosotros</Link>
            <form onSubmit={handleSearch} className="px-4 pt-2">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar..." 
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-lg focus:ring-1 focus:ring-primary-500 focus:outline-none dark:text-white transition"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" />
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
