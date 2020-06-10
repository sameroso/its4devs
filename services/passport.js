const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

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
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
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
          whatsApp: '',
          facebookLink: '',
          gitHub: '',
          description: '',
          initialformFilled: false,
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['name', 'id', 'picture.type(large)', 'displayName'],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const profilePhoto = profile.photos
        ? profile.photos[0].value
        : '/img/faces/unknown-user-pic.jpg';
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          existingUser.profilePic = profilePhoto;
          existingUser.profileName = profile.name.givenName;
          const userUpdated = await existingUser.save();
          return done(null, userUpdated);
        }

        const user = await new User({
          facebookId: profile.id,
          profilePic: profile.photos
            ? profile.photos[0].value
            : '/img/faces/unknown-user-pic.jpg',
          profileName: profile.name.givenName,
          whatsApp: '',
          facebookLink: '',
          gitHub: '',
          description: '',
          initialformFilled: false,
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.gitHubClientId,
      clientSecret: keys.gitHubClientSecret,
      callbackURL: '/auth/github/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const existingUser = await User.findOne({ gitHubId: profile.id });
        if (existingUser) {
          if (
            existingUser.profileName === profile.username &&
            existingUser.profilePic === profile.photos[0].value
          ) {
            return done(null, existingUser);
          } else if (existingUser.profileName !== profile.username) {
            existingUser.profileName = profile.username;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          } else if (existingUser.profilePic !== profile.photos[0].value) {
            console.log('pic changed');
            existingUser.profilePic = profile.photos[0].value;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          } else {
            existingUser.profileName = profile.username;
            existingUser.profilePic = profile.photos[0].value;
            const userUpdated = await existingUser.save();
            return done(null, userUpdated);
          }
        }
        const user = await new User({
          gitHubId: profile.id,
          profilePic: profile.photos[0].value,
          profileName: profile.username,
          whatsApp: '',
          facebookLink: '',
          gitHub: profile.profileUrl,
          description: profile._json.bio,
          initialformFilled: false,
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
