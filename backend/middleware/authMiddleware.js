// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'seuSegredoSuperSecreto';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn('🚫 Erro: Token não fornecido');
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.warn('🚫 Erro: Formato do token inválido:', authHeader);
    return res.status(401).json({ error: 'Formato do token inválido. Use: Bearer <token>' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('✅ Token válido:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('🚫 Token inválido:', err.message);
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;