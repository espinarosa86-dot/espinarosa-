import { useState } from 'react';
import { List, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const getProductCount = (catName) => {
    return products.filter(p => p.category.name === catName).length;
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory._id, categoryName);
    } else {
      addCategory(categoryName);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (getProductCount(name) > 0) {
      alert('No puedes eliminar una categoría que tiene productos asignados. Mueve los productos a otra categoría primero.');
      return;
    }
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      deleteCategory(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categorías</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Gestiona las categorías de tu catálogo</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Nueva Categoría
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos Asignados</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {categories.map(cat => (
                <tr key={cat._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{getProductCount(cat.name)} productos</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleOpenModal(cat)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-4 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat._id, cat.name)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la Categoría</label>
                <input 
                  required 
                  type="text" 
                  value={categoryName} 
                  onChange={e => setCategoryName(e.target.value)} 
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded focus:ring-primary-500 focus:border-primary-500" 
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition shadow-sm">
                  {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
