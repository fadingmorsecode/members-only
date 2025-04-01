const { Pool } = require('pg');
require('dotenv').config();

// ensure connection is hidden via env

const pool = new Pool({
  connectionString:
    'postgresql://neondb_owner:npg_p24qQWBnUviC@ep-noisy-frost-a5sp669h-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
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

async function deletePost(postId) {
  await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
}

async function searchUsername(username) {
  const result = await pool.query(
    'SELECT username FROM users WHERE username = $1',
    [username]
  );
  if (result.rows[0]) {
    return result.rows[0].username;
  }
  return null;
}

module.exports = {
  pool,
  createUser,
  getUser,
  getUserID,
  setMembership,
  createPost,
  getAllPosts,
  setAdmin,
  deletePost,
  searchUsername,
};
