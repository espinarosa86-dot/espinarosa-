const dns = require('dns');
require('dotenv').config();

const dnsServers = process.env.DNS_SERVERS
  ? process.env.DNS_SERVERS.split(',').map((s) => s.trim())
  : [['8', '8', '8', '8'].join('.')];

try {
  dns.setServers(dnsServers);
} catch (error) {
  // Ignorar si no se puede configurar DNS
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const fix = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admi123', salt);
  
  await mongoose.connection.db.collection('users').updateOne(
    { email: 'espinarosa86@gmail.com' },
    { $set: { password: hashedPassword } }
  );
  console.log('Password fixed!');
  process.exit(0);
};
fix().catch((err) => {
  console.error('Failed to fix password:', err);
  process.exit(1);
});
