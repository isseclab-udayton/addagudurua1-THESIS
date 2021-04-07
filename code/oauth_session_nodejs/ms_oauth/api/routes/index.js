const router = require('express')


const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
require('./passport');

// extra encoding keys for a session cookie
var Keygrip = require('keygrip');
// var popupS = require('popups');

app.use(cookieParser());

var { appendFileSync } = require('fs');

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// For an actual app we should configure this with an expiration time, better keys, proxy and secure
// my reference link : https://medium.com/dataseries/storing-sessions-in-express-apps-a67f29a09cc6
app.use(cookieSession({
  name: 'oauth-session',
  keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64')
  // keys: ['key1', 'key2']
}))

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

//-------------------------------------------------------------------------------------------------------------------------------

// starting server here
app.listen(PORT, function () {
  console.log('Server started on http://localhost:' + PORT);
});

//--------------------------------------------------------------------------------------------------------------------------------
// app routes

app.get('/', function (req, res) {
  res.render('pages/auth');
});

app.get('/failed', (req, res) => res.send('You Failed to log in!'))

app.set('view engine', 'ejs');


app.get('/apitest', isLoggedIn, function (req, res) {
  if (userProfile.profile.emails[0].value == 'akshaisbox@gmail.com') {
    res.send(`Hi User: ${userProfile.profile.emails[0].value}`);
  }
  else if (userProfile.profile.emails[0].value == 'addagudurua1@udayton.edu') {
    res.send(`Hi User: ${userProfile.profile.emails[0].value}.... Only You can view this info`);

  }
  else {
    res.send('Unauthorized!!');
  }

});