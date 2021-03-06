const express = require('express');
const app = express();

const keys = require('./config/keys');

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

require('./models/userModel');
require('./services/passport');
require('./models/postModel');

mongoose.connect(keys.mongoURI, { dbName: 'forDevs' });

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
apiRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
