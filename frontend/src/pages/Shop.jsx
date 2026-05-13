import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { useProductStore } from '../store/productStore';
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price_asc', label: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Precio: Mayor a Menor' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { products, categories: storeCategories } = useProductStore();
  const CATEGORIES = ['Todo', ...storeCategories.map(c => c.name)];
  
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [sortOrder, setSortOrder] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    // Filter Category
    if (selectedCategory !== 'Todo') {
      result = result.filter(p => p.category.name === selectedCategory);
    }

    // Sort
    if (sortOrder === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortOrder, searchQuery]);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Catálogo</h1>
            <p className="text-gray-500 dark:text-gray-400">Encuentra los mejores productos para ti</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 items-center w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="relative flex-1 md:flex-none">
              <button 
                onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                className={`flex items-center transition px-4 py-2 rounded-md border ${
                  isFilterOpen || selectedCategory !== 'Todo' 
                    ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/30 dark:border-primary-800 dark:text-primary-400' 
                    : 'bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                }`}
              >
                <Filter size={18} className="mr-2" />
                {selectedCategory === 'Todo' ? 'Filtros' : selectedCategory}
              </button>

              {isFilterOpen && (
                <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl z-20 py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categorías
                  </div>
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      {category}
                      {selectedCategory === category && <Check size={16} className="text-primary-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 md:flex-none">
              <button 
                onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                className={`flex items-center transition px-4 py-2 rounded-md border ${
                  isSortOpen || sortOrder !== 'relevance'
                    ? 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900/30 dark:border-primary-800 dark:text-primary-400' 
                    : 'bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                }`}
              >
                {SORT_OPTIONS.find(o => o.value === sortOrder)?.label}
                <ChevronDown size={18} className="ml-2" />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 left-auto mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl z-20 py-2">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOrder(option.value);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      {option.label}
                      {sortOrder === option.value && <Check size={16} className="text-primary-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron productos{searchQuery ? ` para "${searchQuery}"` : ' en esta categoría'}.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('Todo');
                  if (searchQuery) setSearchParams({});
                }}
                className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
