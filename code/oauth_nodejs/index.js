var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');

const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
require('./passport-setup');

// extra encoding keys for a session cookie
var Keygrip = require('keygrip');
const { use } = require('passport');

const { stringify } = require('querystring');
var jwt = require('jsonwebtoken');
var fs = require('fs');
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(cookieParser());

app.use(cors())

app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}))

// parse application/json
app.use(express.json());

module.exports = app;

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

// Example protected and unprotected routes

// app.get('/', (req, res) => res.send('Example Home page. Go to /google API to login!'))
app.get('/', function (req, res) {
  res.render('pages/auth');
});

app.get('/failed', (req, res) => res.send('You Failed to log in!'))


function onSignIn(googleUser) {
  var userProfile = googleUser.userProfile();
}

// In this route you can see that if the user is logged in u can acess his info in: req.user
// app.get('/success', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

app.get('/success', isLoggedIn, (req, res) => {
  res.render('pages/data');
  // res.send(userProfile.profile);   //use this for regular json output
});


// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


function generateJwt(token_data, secretKey, expiresIn) {
  return jwt.sign(token_data, secretKey, { expiresIn: expiresIn })
}

// this api only works for the people who are added in auth.json
app.get('/apitest', isLoggedIn, function (req, res) {

  // https://www.tutorialkart.com/nodejs/nodejs-parse-json/

  fs.readFile('./private/auth.json',
    function (err, data) {
      var jsonData = data;
      var jsonParsed = JSON.parse(jsonData);

      // https://www.codegrepper.com/code-examples/javascript/get+value+from+JSON.stringify
      for (var i = 0; i < jsonParsed.userList.length; i++) {
        // console.log("length is : ", +jsonParsed.userList.length)
        fetchEmail = jsonParsed.userList[i]['email'];
        fetchSecretKey = jsonParsed.userList[i]['secretKey'];

        var loggedInUser = userProfile.profile.emails[0].value;
        // check for loggedin user with fetched json email value and then break if found...else send to next if() condition below
        if (loggedInUser == fetchEmail) {
          console.log("the fetched email is : ", fetchEmail);
          var tokenData = {
            "email": fetchEmail
          };
          var token = generateJwt(tokenData, fetchSecretKey, '600s');
          res.setHeader('Authorization', `Bearer ${token}`);
          res.cookie('jwt-token', token, { httpOnly: true, secure: false, maxAge: 3600000 });
          break;
        }
      }

      // checking loggedin user with the json user list from fetchEmail..............API authorization here
      if (loggedInUser == fetchEmail) {
        // res.send("The client secret key is: ", + fetchSecretKey); // throws error as sending numbers is not valid using res.send()

        //fetchlevel is the emergency_level value from the json file
        fetchLevel = jsonParsed.emergency_level;

        if (fetchLevel != null && fetchLevel == 1) {
          console.log("The emergency level in JSON is: ", +fetchLevel);
          // res.send(fetchSecretKey);
          // res.status(200).send(`The data is: ${fetchLevel}`).end();
          res.render('pages/cam_streaming');
          res.status(200).send(`The data is: ${fetchLevel}`).end();
        } else {
          console.log("The streaming data is not available now! Try later! ");
          res.send("The data is not available now! Try later! ");
        }
      }
      else {
        res.send("You're unauthorized! Contact an Admin...");
      }

    });

});


app.listen(3000, '0.0.0.0', function () {
  console.log(`App now listening on server: http://localhost:${3000}`);
});