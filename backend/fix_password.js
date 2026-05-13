require('dns').setServers(['8.8.8.8']);
require('dotenv').config();
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
fix();
