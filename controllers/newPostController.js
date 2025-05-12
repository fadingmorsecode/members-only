const { createPost } = require('../config/queries');

exports.newPostControllerPost = async (req, res) => {
  const user = req.user;
  const title = req.body['title-input'];
  const text = req.body['post-text-input'];
  await createPost(user.firstname, user.lastname, title, text);
  res.redirect('/');
};
