const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/dev');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecretKey,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        console.log(existingUser);
        if (existingUser) {
          if (
            existingUser.profileName === profile.name.givenName &&
            existingUser.profilePic === profile._json.picture
          ) {
            return done(null, existingUser);
          } else if (existingUser.profileName !== profile.name.givenName) {
            existingUser.profileName = profile.name.givenName;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          } else if (existingUser.profilePic !== profile._json.picture) {
            console.log('pic changed');
            existingUser.profilePic = profile._json.picture;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          } else {
            existingUser.profileName = profile.name.givenName;
            existingUser.profilePic = profile._json.picture;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          }
        }
        const user = await new User({
          googleId: profile.id,
          profilePic: profile._json.picture,
          profileName: profile.name.givenName,
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
