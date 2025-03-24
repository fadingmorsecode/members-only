const router = require('express').Router();
const registrationController = require('../controllers/registrationController');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', errors: null });
});

router.post('/register', registrationController.userRegistrationPost);
module.exports = router;
