require('./passport-setup');
var express = require('express')
var app = express()


// google auth routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {  
    // Successful authentication, redirect home.
    // res.send(req.user);
    res.redirect('/success');
  }
);


function onSignIn(googleUser) {
  var userProfile = googleUser.userProfile();
  }
  
  // In this route you can see that if the user is logged in u can acess his info in: req.user
  // app.get('/success', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))
  
  app.get('/success', isLoggedIn, (req, res) => {
    // res.send(`Welcome User: ${req.user.userProfile()}`)
    // res.render('index.js', { username: req.user.username });
    res.render('pages/data');
    // res.send(userProfile.profile);   //use this for regular json output
  
  });