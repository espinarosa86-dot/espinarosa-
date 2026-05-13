require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');

const connectDB = require('./config/db');

const importData = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@espinarosa.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        isAdmin: true,
      }
    ]);

    const createdCategories = await Category.create([
      { name: 'Cuidado Facial', description: 'Productos para la cara' },
      { name: 'Maquillaje', description: 'Maquillaje profesional' },
      { name: 'Perfumes', description: 'Fragancias premium' },
    ]);

    const adminUser = createdUsers[0]._id;
    const catFacial = createdCategories[0]._id;
    const catMaquillaje = createdCategories[1]._id;
    const catPerfumes = createdCategories[2]._id;

    await Product.create([
      {
        name: 'Sérum de Vitamina C',
        price: 25.99,
        description: 'Un potente sérum antioxidante que ilumina y unifica el tono de la piel. Contiene 15% de vitamina C pura, ácido hialurónico y vitamina E.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop',
        category: catFacial,
        stock: 15,
        rating: 4.8,
        numReviews: 124,
        isNewProduct: true
      },
      {
        name: 'Crema Hidratante de Noche',
        price: 34.50,
        description: 'Crema reparadora que trabaja mientras duermes. Hidratación profunda para amanecer con una piel suave y rejuvenecida.',
        image: 'https://images.unsplash.com/photo-1611077544766-3d2b27072670?w=500&auto=format&fit=crop',
        category: catFacial,
        stock: 5,
        rating: 4.5,
        numReviews: 89,
        isNewProduct: false
      },
      {
        name: 'Paleta de Sombras Nude',
        price: 42.00,
        description: '12 tonos altamente pigmentados desde mates suaves hasta metálicos deslumbrantes.',
        image: 'https://images.unsplash.com/photo-1512496115841-a45e560db40b?w=500&auto=format&fit=crop',
        category: catMaquillaje,
        stock: 20,
        rating: 4.9,
        numReviews: 230,
        isNewProduct: true
      },
      {
        name: 'Perfume Floral Elegance',
        price: 85.00,
        description: 'Fragancia sofisticada con notas de jazmín, rosa y sándalo.',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop',
        category: catPerfumes,
        stock: 8,
        rating: 4.7,
        numReviews: 56,
        isNewProduct: false
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
