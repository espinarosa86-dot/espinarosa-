import { Heart, Star, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            {...fadeIn}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6"
          >
            Nuestra Historia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            "En EspinaRosa creemos que la belleza es una forma de expresión. Nuestra tienda ofrece productos cuidadosamente seleccionados para ayudarte a sentirte segura, auténtica y hermosa. Trabajamos con productos de calidad y brindamos atención cercana y personalizada para cada cliente."
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Compromiso</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nos dedicamos a resaltar tu belleza natural con productos amigables con tu piel y con el medio ambiente.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Atención Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cada piel es un mundo. Nuestro equipo está listo para asesorarte y encontrar el producto ideal para ti.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Calidad Garantizada</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Solo trabajamos con marcas reconocidas y fórmulas probadas que garantizan resultados reales.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Envíos y Pedidos</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Realizamos despachos rápidos y seguros a nivel nacional. Tu pedido llegará directamente a tus manos.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Image / Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <img 
                src="/about-image.jpeg" 
                alt="Productos EspinaRosa" 
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Más que una tienda, un refugio para tu piel
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                EspinaRosa nació del deseo de crear un espacio donde el cuidado personal se sienta como un ritual, no como una obligación. Seleccionamos rigurosamente cada crema, sérum y paleta de maquillaje que ofrecemos.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nuestra misión es educar, inspirar y acompañarte en tu viaje hacia el amor propio y la confianza. Porque sabemos que cuando te sientes bien por fuera, irradias seguridad por dentro.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
