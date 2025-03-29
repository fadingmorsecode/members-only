const { setMembership } = require('../config/queries');
require('dotenv').config();

exports.membershipStatusPost = async (req, res) => {
  if (req.body.membershipPassword === process.env.MEMBERSHIPPASSWORD) {
    await setMembership(req.user.username);
    res.render('membershipSuccess', { name: req.user.firstname });
  } else {
    res.render('membershipFailure');
  }
};
