const db = require('../database/config');

class User {
  static findByEmail(email, callback) {
    const q = 'SELECT id, email, password_hash, username FROM users WHERE LOWER(email)=LOWER(?) LIMIT 1';
    db.get(q, [email], (err, row) => callback(err, row));
  }

  static create(email, passwordHash, username, callback) {
    const q = 'INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)';
    db.run(q, [email, passwordHash, username], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, email, username });
    });
  }

  static findById(id, callback) {
    db.get('SELECT id, email, username FROM users WHERE id=?', [id], (err, row) => callback(err, row));
  }
}

module.exports = User;
