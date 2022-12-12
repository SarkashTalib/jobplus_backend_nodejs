const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login a user
const login = async (body) => {
  const { email, password } = body;

  // find user in database
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (rows.length === 0) {
    throw new Error('Username or password is incorrect');
  }

  // compare password
  const isMatch = await bcrypt.compare(password, rows[0].password);
  if (!isMatch) {
    throw new Error('Username or password is incorrect');
  }

  // generate token
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}

// active user
const active = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { rows } = await db.query('SELECT * FROM "users" WHERE id = $1', [decoded.id]);
  return rows[0];
};

// export all the functions
module.exports = {
  login,
  active,
};