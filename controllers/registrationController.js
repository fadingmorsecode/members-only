const { body, validationResult } = require('express-validator');
const { genPassword } = require('../lib/passwordUtils');
const { createUser, searchUsername } = require('../config/queries');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters';
const emailErr = 'must be a valid email address';
const passwordErr =
  'must be at least 8 characters and contain at least one symbol and one number ';

const validateUser = [
  body('fname')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 16 })
    .withMessage(`First name ${lengthErr}`),
  body('lname')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 16 })
    .withMessage(`Last name ${lengthErr}`),
  body('em').trim().isEmail().withMessage(`Email ${emailErr}`),
  body('pw')
    .trim()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(`Password, ${passwordErr}`),
  body('cpw')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.pw) {
        throw new Error('Password do not match');
      }
      return true;
    }),
];

exports.userRegistrationPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render('register', { title: 'Register', errors: errors.array() });
    }
    const { fname, lname, em, pw } = req.body;
    const searchedEmail = await searchUsername(em);
    if (em === searchedEmail) {
      return res.status(400).render('register', {
        title: 'Register',
        errors: [{ msg: 'A user with this email already exists' }],
      });
    }
    const hashedPassword = await genPassword(pw);
    createUser(fname, lname, em, hashedPassword);
    res.render('registrationSuccess');
  },
];
