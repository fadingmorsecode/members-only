const bcrypt = require('bcryptjs');

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const genHash = await bcrypt.hash(password, salt);
  return genHash;
}

async function validPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

module.exports = { genPassword, validPassword };
