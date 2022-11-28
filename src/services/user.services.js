const db = require('../config/database');
const bcrypt = require('bcrypt');

// create user
exports.createUser = async (body) => {
  const { first_name, last_name, email, password, confirm_password } = body;

  const { rows } = await db.query( 
    'INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, password]
  );

  return rows;
};

