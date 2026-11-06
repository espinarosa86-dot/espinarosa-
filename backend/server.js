require('dotenv').config();
const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'https://espinarosa-wjth.onrender.com'
    ];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('EspinaRosa API is running');
});

// Database connection & Server initialization
const connectDB = require('./config/db');

connectDB()
  .then(() => {
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
  })
  .catch((err) => {
    console.error(`Failed to connect to database: ${err.message}`);
    process.exit(1);
  });
