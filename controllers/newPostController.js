const { createPost } = require('../config/queries');

exports.newPostControllerPost = async (req, res) => {
  const user = req.user;
  const text = req.body['post-text-input'];
  await createPost(user.firstname, user.lastname, text);
  res.redirect('/');
};
