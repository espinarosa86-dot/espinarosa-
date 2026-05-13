import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-serif font-bold text-primary-600 mb-4 inline-block">
              EspinaRosa
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
              Tu destino premium para productos de belleza, cuidado personal y maquillaje. Realza tu belleza natural.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">FB</a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">IG</a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">TW</a>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4 font-serif text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition">Tienda</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition">Nosotros</Link></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 transition">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4 font-serif text-lg">Contacto</h3>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400">
              <li>espinarosa86@gmail.com</li>
              <li>3237321035</li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} EspinaRosa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
