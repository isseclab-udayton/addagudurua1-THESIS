var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const cookieSession = require('cookie-session')
var cookieParser = require('cookie-parser');
//-------------------------------------------------------------------------------------------------------------

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.set('view engine', 'ejs');
//-------------------------------------------------------------------------------------------------------------

// random api creation
app.get('/api', function (req, res) {
    console.log("GET /api");
    res.json({
        text: "this is some api call"
    });
})


// creating a JWT custom data headers and generating a JWT
app.get('/api/somedata', function (req, res, next) {
    console.log("\nGET /api/somedata");
    const userdata = [
        {
            sub: 12345,
            obj: "CameraRoom1",
            act: "liveCam"
        }
    ];
    const token = jwt.sign({ userdata }, 'my_secret_key', { expiresIn: '600s' });
    res.cookie('jwt-token', token, { httpOnly: true, secure: false, maxAge: 3600000 });
    // res.set('Authorization', `Bearer ${token}`);

    res.json({
        token: token
    });

    console.log("The JWT token is: ", token);
    next();
});



app.set(ensureJwtToken, verifyJwtToken);        // this passes jwt token to all apis...


// this function makes sure that JWT token is passed in the headers
function ensureJwtToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
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
    // console.log(req.headers);
    // console.log('token=' ,req.token);
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            // res.sendStatus(401); 
            res.status(401).send(`The error is: ${err}`).end();
            console.log("The error logged is: \n", err);
            // end();
        } else {
            res.status(200).json({
                text: 'This is protected api',
                data: data
            });
            console.log("\nThe data is: ", data);
            // next();
        }
        // console.log(req.headers);
        next();
    });
}


app.set(ensureJwtToken, verifyJwtToken);

// app.use({
//     'Authorization':`Bearer ${}`
// });

app.get('/api/protected', function (req, res,next) {
    console.log("\nGET /api/protected");
    // console.log(req.headers);
    // console.log(res.cookie());
    console.log(req.headers.cookie);


    res.status(200).json({
        status: 'success',
        info1: req.token
    });
    next();
});


app.listen(9000, '0.0.0.0', function () {
    console.log(`App now listening on server: http://localhost:${9000}`);
});

