// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middlewares (devem vir ANTES das rotas)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend Vue rodando no Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sincronização do banco e inicialização do servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Banco de dados sincronizado');
    
    app.listen(3000, () => {
      console.log('🟢 Servidor rodando na porta 3000');
    });
    
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar banco:', err);
  });