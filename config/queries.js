const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://dwill:Mrmoomoo1@localhost:5432/members_only',
});

async function createUser(firstname, lastname, email, password) {
  const { rows } = await pool.query(
    'INSERT INTO users (firstname, lastname, username, password) values ($1, $2, $3, $4)',
    [firstname, lastname, email, password]
  );
  return rows[0];
}

async function getUser(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  return rows[0];
}

const getUserID = async function (userId) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);
  return rows[0];
};

async function setMembership(username) {
  await pool.query('UPDATE users SET membership = true WHERE username = $1', [
    username,
  ]);
}

async function createPost(firstname, lastname, text) {
  const name = `${firstname} ${lastname}`;
  await pool.query('INSERT INTO posts (name, text) VALUES ($1, $2)', [
    name,
    text,
  ]);
}

async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
}

async function setAdmin(username) {
  await pool.query('UPDATE users SET admin = true WHERE username = $1', [
    username,
  ]);
}

module.exports = {
  createUser,
  getUser,
  getUserID,
  setMembership,
  createPost,
  getAllPosts,
  setAdmin,
};
