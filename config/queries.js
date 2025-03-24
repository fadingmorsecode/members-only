const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://dwill:Mrmoomoo1@localhost:5432/members_only',
});

async function createUser(firstname, lastname, email, password) {
  console.log('yo');
  console.log(password);
  const { rows } = await pool.query(
    'INSERT INTO users (firstname, lastname, username, password) values ($1, $2, $3, $4)',
    [firstname, lastname, email, password]
  );
  return rows[0];
}

module.exports = { createUser };
