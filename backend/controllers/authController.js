const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (user) =>
  jwt.sign({ sub: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

exports.register = (req, res) => {
  const { email, password, username } = req.body || {};
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, mot de passe et nom d\'utilisateur sont requis' });
  }

  User.findByEmail(email, (errE, existingEmail) => {
    if (errE) return res.status(500).json({ error: 'Erreur serveur' });
    if (existingEmail) return res.status(409).json({ error: 'Email déjà utilisé' });

    User.findByUsername(username, async (errU, existingUsername) => {
      if (errU) return res.status(500).json({ error: 'Erreur serveur' });
      if (existingUsername) return res.status(409).json({ error: 'Nom d\'utilisateur déjà utilisé' });

      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        User.create(email, hash, username, (createErr, created) => {
          if (createErr) {
            if (createErr.code === 'SQLITE_CONSTRAINT') {
              const m = createErr.message || '';
              if (m.includes('users.username')) return res.status(409).json({ error: 'Nom d\'utilisateur déjà utilisé' });
              if (m.includes('users.email')) return res.status(409).json({ error: 'Email déjà utilisé' });
              return res.status(409).json({ error: 'Contrainte d’unicité violée' });
            }
            return res.status(500).json({ error: 'Erreur de création' });
          }
          const token = signToken(created);
          res.status(201).json({ token, user: { id: created.id, email: created.email, username: created.username } });
        });
      } catch {
        res.status(500).json({ error: 'Erreur serveur' });
      }
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe sont requis' });

  User.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

    const token = signToken({ id: user.id, email: user.email, username: user.username });
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  });
};
