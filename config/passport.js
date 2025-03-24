const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { connection, User, UserID } = require('./queries');
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
  firstNameField: 'fname',
  lastNameField: 'lname',
  emailField: 'em',
  passwordField: 'pw',
  confirmPasswordField: 'cpw',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User(username);
    if (!user) {
      return done(null, false);
    }

    const isValid = validPassword(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
