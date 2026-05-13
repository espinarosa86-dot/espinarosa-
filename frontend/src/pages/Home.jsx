import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Cuidado Facial', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop' },
    { name: 'Maquillaje', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&auto=format&fit=crop' },
    { name: 'Perfumes', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-50 dark:bg-gray-800 transition-colors duration-300">
          <img 
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1600&auto=format&fit=crop" 
            alt="Beauty Background" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20 transition-opacity duration-300"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6"
          >
            Realza tu belleza <br />
            <span className="text-primary-600 italic">natural</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Descubre nuestra selección premium de productos de cuidado facial, maquillaje y fragancias.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/shop" 
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition shadow-lg hover:shadow-primary-500/30"
            >
              Comprar Ahora
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories preview */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Categorías Destacadas</h2>
            <div className="h-1 w-20 bg-primary-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to="/shop" className="group relative block h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-serif font-bold text-white tracking-wider">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
