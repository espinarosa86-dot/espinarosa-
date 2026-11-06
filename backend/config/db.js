const mongoose = require('mongoose');
const dns = require('dns');

// Configurar servidores DNS para evitar bloqueos de SRV por el proveedor de internet
const dnsServers = process.env.DNS_SERVERS
  ? process.env.DNS_SERVERS.split(',').map((s) => s.trim())
  : [['8', '8', '8', '8'].join('.'), ['8', '8', '4', '4'].join('.')];

try {
  dns.setServers(dnsServers);
} catch (error) {
  console.log('No se pudo configurar DNS, continuando...');
}

let mongoServer;

const connectDB = async () => {
  try {
    let dbUri = process.env.MONGODB_URI;

    if (process.env.USE_MEMORY_DB === 'true' || dbUri === 'mongodb://127.0.0.1:27017/espinarosa') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      dbUri = mongoServer.getUri();
      console.log('Using In-Memory MongoDB for Development');
    }

    await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
