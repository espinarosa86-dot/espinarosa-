require('dotenv').config();
const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('EspinaRosa API is running');
});

// Database connection
const connectDB = require('./config/db');
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Keep-alive ping para evitar que Render se duerma
  const url = 'https://espinarosa-wjth.onrender.com/';
  setInterval(() => {
    https.get(url, (res) => {
      console.log(`Ping automático para mantener despierto: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Error en el ping automático: ${err.message}`);
    });
  }, 14 * 60 * 1000); // Se ejecuta cada 14 minutos
});
