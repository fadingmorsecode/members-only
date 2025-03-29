const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { connection, User, UserID } = require('./queries');
const validPassword = require('../lib/passwordUtils').validPassword;
const { getUser, getUserID } = require('../config/queries');

const customFields = {
  usernameField: 'emailLogin',
  passwordField: 'passwordLogin',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await getUser(username);
    if (!user) {
      return done(null, false);
    }
    console.log(user);
    console.log(password, user.password);
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await getUserID(userId);
  done(null, user);
});
