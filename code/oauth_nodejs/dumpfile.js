var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
const { newEnforcerWithClass } = require('casbin');
//-------------------------------------------------------------------------------------------------------------

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

//-------------------------------------------------------------------------------------------------------------

// randome ap creation
app.get('/api', function (req, res) {
    console.log("GET /api");
    res.json({
        text: "this is some api call"
    });
})


// creating a JWT custom data headers and generating a JWT
app.get('/api/somedata', function (req, res) {
    console.log("\nGET /api/somedata");
    const userdata = [
        {
            sub: 12345,
            obj: "CameraRoom1",
            act: "liveCam"
        }
    ];
    const token = jwt.sign({ userdata }, 'my_secret_key', { expiresIn: '60s' });
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 });

    res.json({
        token: token
    });
    console.log("The JWT token is: ", token);

});


// setHeader = function (req, res, next) {
//     res.header('Authorization', `Bearer ${req.headers.authorization}`);
//     next();
// }

// this function makes sure that JWT token is passed in the headers
function ensureJwtToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" "); // slices token of format 'Bearer eydhdhd....'
        const bearerToken = bearer[1];  // fetching 1st part which is token..omitting bearer word
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function verifyJwtToken(req, res, next) {

    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        // console.log("\nThis is the req token: ", req.token);
        if (err) {
            // res.sendStatus(401);
            res.status(401).send(`The error is: ${err}`).end();
            console.log("The error logged is: \n", err);
            res.end();
        } else {
            res.json({
                text: 'This is protected api',
                data: data
            });
            console.log("\nThe data is: ", data);
            next();
        }

    });
}


// app.set(ensureJwtToken, verifyJwtToken);


// get method describing if the endpoints are protected are not using 'ensureJwtToken'...if no token, forbidden
app.get('/api/protected', ensureJwtToken, verifyJwtToken, function (req, res) {
    // const tokenVal = res.json();
    console.log("\nGET /api/protected");
    res.json({
        details: req.headers
    });
});




app.listen(9000, '0.0.0.0', function () {
    console.log(`App now listening on server: http://localhost:${9000}`);
});