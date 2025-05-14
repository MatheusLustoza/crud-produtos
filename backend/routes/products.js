const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
console.log('>>> O que é Product?', Product);
console.log('>>> Métodos de Product:', Object.keys(Product));
// routes/products.js

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Erro no GET /api/products:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

// Criar um produto
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Produto deletado' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;