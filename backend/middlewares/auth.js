const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    User.findById(payload.sub, (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Token invalide' });
      req.user = user;
      next();
    });
  } catch {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
