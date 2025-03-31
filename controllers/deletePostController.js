const { deletePost } = require('../config/queries');

exports.deletePostPost = async function (req, res) {
  await deletePost(req.params.postid);
  res.redirect('/');
};
