//casbin import
const { newEnforcer } = require('casbin');
//load policiescle
const enforcer = newEnforcer('./node_modules/casbin/examples/rbac_model.conf', './node_modules/casbin/examples/rbac_policy.csv');

//other imports
// camera service code here
const path = require('path');
const express = require('express');
const http = require('http');
const cors = require('cors')
const app = express();
const httpServer = http.createServer(app);
var cookieParser = require('cookie-parser');

const passport = require('passport');
require('./passport-setup');
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))



// function onSignIn(googleUser) {
//     var userProfile = googleUser.userProfile();
// }

const isLoggedIn = (req, res, next) => {
    console.log(req.headers);
    console.log(req.user);
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        res.send('Login to localhost:3000 to get authorization here');
    }
};

// HTTP stuff
app.get('/streamer', function (req, res) {
    res.render('pages/cam_streaming');
});

app.get('/', (req, res, next) => {
    res.send(`
        <a href="streamer">Camera Streamer</a><br>
        Note: Please allow access to Camera in your browser

    `);
});

httpServer.listen(PORT, () => console.log(`HTTP server listening at http://localhost:${PORT}`));
