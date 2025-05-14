// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Cadastro
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Criptografar a senha
    const hash = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const user = await User.create({ username, password: hash });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário' });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Comparar a senha enviada com a senha criptografada
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    res.json({ message: 'Login bem-sucedido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
};