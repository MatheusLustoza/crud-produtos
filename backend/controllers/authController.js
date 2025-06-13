const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'seuSegredoSuperSecreto';

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hash });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
  },

  login: async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login bem-sucedido',
      token    // vindo da requisição 
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
}
};
const getProdutos = async (req, res) => {
  const { categoria } = req.query;
  const where = {};

  if (categoria) {
    where.categoria = categoria;
  }

  try {
    const produtos = await Produto.findAll({ where });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produtos." });
  }
};

module.exports = AuthController;