const { setAdmin } = require('../config/queries');

require('dotenv').config();

exports.adminLoginPost = async function (req, res) {
  const user = req.user;
  const passInput = req.body['admin-pass-input'];
  if (passInput === process.env.ADMINPASS) {
    await setAdmin(user.username);
    res.redirect('/');
  } else {
    res.render('adminFailure');
  }
};
