const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const routes = require('./routes');
const passport = require('passport');
const { connection } = require('./config/queries');
require('dotenv').config();

const app = express();

const path = require('node:path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    store: new pgSession({
      pool: connection,
      tableName: 'session',
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(999, function () {
  console.log('App listening on port 999!');
});
