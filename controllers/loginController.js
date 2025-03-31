const { body, validationResult } = require('express-validator');
const emailErr = 'must be a valid email address';

const validateLogin = [
  body('emailLogin').isEmail().withMessage(`email ${emailErr}`),
];

exports.loginPost = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render('login', { title: 'Login', errors: errors.array() });
    }
    next();
  },
];
