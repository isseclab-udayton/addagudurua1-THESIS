var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport functions
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    // User.findById(id, function(err, user) {
      done(null, user);
    // });
  });


function onSignIn(googleUser) {
  var userProfile = googleUser.getBasicProfile();
}

passport.use(new GoogleStrategy({
    clientID: '645021008168-h2c6vjdmfta6k6n7l62299mdhpb6e2c6.apps.googleusercontent.com',
    clientSecret: '818T7ojNwRa-TNt2HlZTPYOl',
    callbackURL: "http://localhost:3000/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('Access token : ' +accessToken);
      userProfile = {profile, accessToken};
      return done(null, userProfile);
  }
));