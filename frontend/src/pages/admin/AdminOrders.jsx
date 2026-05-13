import { ShoppingBag } from 'lucide-react';

export default function AdminOrders() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Registro de pedidos realizados (vía WhatsApp)</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center transition-colors duration-300">
        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No hay pedidos registrados</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Actualmente, los pedidos se gestionan directamente a través de WhatsApp. Si deseas un sistema automático de registro de pedidos, puedes solicitar la integración con la base de datos más adelante.
        </p>
      </div>
    </div>
  );
}
