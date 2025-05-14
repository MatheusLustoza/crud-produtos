const bcrypt = require('bcrypt');
const User = require('../models/User');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

exports.listUsers = (req, res) => {
  const sql = 'SELECT id, username FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao consultar usuários.' });
    } else {
      res.json(rows);
    }
  });
};

const AuthController = {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hash });
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Senha incorreta' });
  
      return res.json({ message: 'Login bem-sucedido' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro no login' });
    }
  }
};

module.exports=AuthController;