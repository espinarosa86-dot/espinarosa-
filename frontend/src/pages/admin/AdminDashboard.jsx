import { TrendingUp, Users, ShoppingBag, Package } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

export default function AdminDashboard() {
  const products = useProductStore(state => state.products);
  
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 5).length;
  
  const stats = [
    { name: 'Total Productos', value: totalProducts.toString(), icon: <Package size={24} />, change: 'Catálogo Activo', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-900/30' },
    { name: 'Stock Bajo', value: lowStockProducts.toString(), icon: <TrendingUp size={24} />, change: 'Requieren atención', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Pedidos WhatsApp', value: '15', icon: <ShoppingBag size={24} />, change: 'Esta semana', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
    { name: 'Clientes Nuevos', value: '8', icon: <Users size={24} />, change: 'Esta semana', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resumen de Actividad</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Estadísticas clave de los últimos 30 días</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex items-center transition-colors duration-300">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} dark:bg-opacity-20 ${stat.color} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <span className={`ml-2 text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recents Table mock */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Avisos del Sistema</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 dark:text-gray-400">No hay notificaciones recientes. Todo funciona correctamente.</p>
        </div>
      </div>
    </div>
  );
}
