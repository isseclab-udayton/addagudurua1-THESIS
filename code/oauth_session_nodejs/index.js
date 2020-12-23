var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');
const cookieSession = require('cookie-session')
// var cookieParser = require('cookie-parser');
require('./passport-setup');

// var popupS = require('popups');
// app.use(cookieParser());

app.use(cors())

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

// For an actual app you should configure this with an expiration time, better keys, proxy and secure
app.use(cookieSession({
    name: 'oauth-session',
    keys: ['key1', 'key2']
  }))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());
// Example protected and unprotected routes

// app.get('/', (req, res) => res.send('Example Home page. Go to /google API to login!'))
app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.set('view engine', 'ejs');

function onSignIn(googleUser) {
var userProfile = googleUser.userProfile();
// var profile = req.user.id();
// var username = req.user.username();
// var userName = userProfile.displayName();
}

// In this route you can see that if the user is logged in u can acess his info in: req.user

// app.get('/success', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

app.get('/success', isLoggedIn, (req, res) => {
  // res.send(`Welcome User: ${req.user.userProfile()}`)
  // res.render('index.js', { username: req.user.username });
  res.send(userProfile);
});


// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {  
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();  
    res.redirect('/');
})

app.get('/apitest', isLoggedIn, function(req, res) {
  // res.render('pages/data');
  // res.send(`Welcome User: ${userProfile.profile.emails[0].value}`);
  if (userProfile.profile.emails[0].value == 'akshaisbox@gmail.com'){
  res.send(`Hi User: ${userProfile.profile.emails[0].value}`);
  }
  else {
    res.send('Unauthorized!!');
  }

});

app.listen(3000, () => console.log(`App now listening on port ${3000}!`))