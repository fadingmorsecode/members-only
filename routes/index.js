const router = require('express').Router();
const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const membershipController = require('../controllers/membershipController');
const { isAuth } = require('./authMiddleware');
const passport = require('passport');
const { newPostControllerPost } = require('../controllers/newPostController');

router.get('/', (req, res) => {
  let user;
  if (req.user) {
    user = req.user;
  }
  console.log(user);
  res.render('index', { title: 'Home', user: user });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', errors: null });
});

router.post('/register', registrationController.userRegistrationPost);

router.get('/membership', isAuth, (req, res) => {
  let membership = false;
  if (req.user) {
    membership = req.user.membership;
  }
  res.render('membership', {
    title: 'Confirm Membership',
    membership: membership,
  });
});

router.post('/membership', membershipController.membershipStatusPost);

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', errors: null });
});

router.post(
  '/login',
  loginController.loginPost,
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success',
  })
);

router.get('/login-failure', (req, res) => {
  res.render('loginFailure');
});

router.get('/login-success', (req, res) => {
  res.render('loginSuccess');
});

router.get('/create-post', isAuth, (req, res) => {
  res.render('createPostForm');
});

router.post('/create-post', newPostControllerPost);

module.exports = router;
