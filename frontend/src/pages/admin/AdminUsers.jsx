import { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2 } from 'lucide-react';

const MOCK_USERS = [
  { id: 1, name: 'Ana García', email: 'ana@ejemplo.com', role: 'Cliente', date: '2023-10-15' },
  { id: 2, name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Cliente', date: '2023-11-02' },
  { id: 3, name: 'María Rodríguez', email: 'maria@ejemplo.com', role: 'Admin', date: '2023-08-20' },
  { id: 4, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'Cliente', date: '2023-12-05' },
  { id: 5, name: 'Laura Martínez', email: 'laura@ejemplo.com', role: 'Cliente', date: '2024-01-10' },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Gestiona los clientes y administradores</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition flex items-center shadow-sm">
          <UserPlus size={18} className="mr-2" /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 p-4 transition-colors duration-300">
        <div className="relative max-w-md">
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-4 transition-colors"><Edit2 size={18} /></button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
