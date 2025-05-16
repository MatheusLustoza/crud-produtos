const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // *** Esse middleware é necessário para o Express processar JSON ***

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Sync e inicialização do servidor
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco ou iniciar servidor:',err);
});