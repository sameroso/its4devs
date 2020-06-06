const express = require('express');
const app = express();

const keys = require('./config/dev');

const authRoutes = require('./routes/authRoutes');

const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

require('./models/userModel');
require('./services/passport');

mongoose.connect(keys.mongoURI, { dbName: 'todoando' });

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);

app.listen(5000);
