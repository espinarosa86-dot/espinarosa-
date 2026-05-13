import { useLocation, Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Package, List, ShoppingBag, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin" />;
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Productos' },
    { path: '/admin/categories', icon: <List size={20} />, label: 'Categorías' },
    { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Pedidos' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="font-serif text-xl font-bold text-primary-600 dark:text-primary-500">EspinaRosa Admin</h1>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-r-4 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition"
          >
            <LogOut size={20} className="mr-3" /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 transition-colors duration-300">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {menuItems.find(i => location.pathname.startsWith(i.path))?.label || 'Panel'}
          </h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">Hola, Admin</span>
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950 p-8 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
