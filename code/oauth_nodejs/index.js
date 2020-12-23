// index.js

/*  EXPRESS */
// Setting up web requests

const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/auth');
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));



/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => {
  res.send(userProfile)
}); 
app.get('/error', (req, res) => {
  res.status(404).send("Authorisation Failed")
});
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: '645021008168-h2c6vjdmfta6k6n7l62299mdhpb6e2c6.apps.googleusercontent.com',
    clientSecret: '818T7ojNwRa-TNt2HlZTPYOl',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('accessToken='+accessToken);
      console.log('refreshToken' +refreshToken)
      userProfile={profile, accessToken};
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });


app.get('/apitest', 
  passport.authenticate('google', { scope : ['profile', 'email'] }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });