const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Cadastro e login
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Rota protegida
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'password'] // ou remova 'password' se quiser mais seguro
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
// Consultar todos os usuários

router.get('/users', async (req, res) => {
  try {
    throw new Error('Simulando erro ao buscar usuários'); // força o catch
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});


// Excluir usuário por ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await require('../models/User').destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});
module.exports = router;