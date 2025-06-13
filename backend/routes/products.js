// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Listar produtos com filtro por categoria
router.get('/', async (req, res) => {
  const { categoria } = req.query;

  try {
    const where = {};
    if (['Roupas', 'Eletrônicos'].includes(categoria)) {
      where.categoria = categoria;
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.message);
    res.status(500).json({ error: 'Erro interno ao buscar produtos' });
  }
});

// Criar produto
router.post('/', async (req, res) => {
  const { name, price, description, categoria } = req.body;
  const parsedPrice = parseFloat(price);

  if (!name || !parsedPrice || !categoria) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando!' });
  }

  try {
    const product = await Product.create({
      name,
      price: parsedPrice,
      description,
      categoria
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error.message);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    const updatedData = { ...req.body };
    if (updatedData.price) {
      const parsedPrice = parseFloat(updatedData.price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ error: 'Preço deve ser um número válido!' });
      }
      updatedData.price = parsedPrice;
    }

    await product.update(updatedData);
    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
    res.status(400).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    await product.destroy();
    res.json({ message: 'Produto excluído' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error.message);
    res.status(400).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;