const router = require('express').Router();
const registrationController = require('../controllers/registrationController');
const loginController = require('../controllers/loginController');
const membershipController = require('../controllers/membershipController');
const { isAuth, isAdmin } = require('./authMiddleware');
const passport = require('passport');
const { newPostControllerPost } = require('../controllers/newPostController');
const { getAllPosts } = require('../config/queries');
const { adminLoginPost } = require('../controllers/adminController');
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const greetPlugin = require('dayjs-greet');
const { deletePostPost } = require('../controllers/deletePostController');
dayjs.extend(greetPlugin);
dayjs.extend(advancedFormat);

router.get('/', async (req, res) => {
  let user = null;
  const posts = await getAllPosts();
  posts.forEach((post) => {
    post.formattedTimestamp = dayjs(post.timestamp).format('h:mma');
    post.formattedDate = dayjs(post.timestamp).format('MMM Do YYYY');
    console.log(post);
  });
  console.log('hji');
  console.log(posts);
  const greeting = dayjs(Date()).greet();
  if (req.user) {
    user = req.user;
  }
  res.render('index', {
    title: 'Home',
    user: user,
    posts: posts,
    greeting: greeting,
  });
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

router.get('/admin', isAuth, (req, res) => {
  res.render('admin');
});

router.post('/admin', isAuth, adminLoginPost);

router.post('/delete-post/:postid', isAdmin, deletePostPost);

router.get('/logout', isAuth, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
