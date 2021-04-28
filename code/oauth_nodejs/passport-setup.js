var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport functions
// serializing user info here and sending it to the cookie
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
    clientID: '40698350851-r6ka9quspf3kiaemoomrs409i4fo6is5.apps.googleusercontent.com',
    clientSecret: 'JD6bp-D5T7NmMA1O3QJP6FB0',
    callbackURL: "http://localhost:3000/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('Access token : ' +accessToken);
      userProfile = {profile, accessToken};
      
      // console.log('User profile is: ' +userProfile);
      // console.log('Refresh Token is: '+refreshToken);
      
      return done(null, userProfile);
  }
));