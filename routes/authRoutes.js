const passport = require('passport');

const authRoutes = (app) => {
  app.get('/', (req, res) => res.send('Hello World!'));
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
};

module.exports = authRoutes;
