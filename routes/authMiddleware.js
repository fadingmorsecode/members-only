module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .render('error', {
        errorMsg: 'You are not authorized to view this resource',
      });
  }
};
