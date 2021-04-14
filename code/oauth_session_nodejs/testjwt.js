var express = require('express');
var jwt = require('jsonwebtoken');
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

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
    const token = jwt.sign({ userdata }, 'my_secret_key', { expiresIn: '45s' });
    res.json({
        token: token
    });
    console.log("The JWT token is: ", token);
});


// get method describing if the endpoints are protected are not using 'ensureJwtToken'...if no token, forbidden
app.get('/api/protected', ensureJwtToken, function (req, res) {
    // res.setHeader('Authorization', 'Bearer ' +res.token);
    console.log("\nGET /api/protected");
    
});

// this function makes sure that JWT token is passed in the headers
function ensureJwtToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" "); // slices token of format 'Bearer eydhdhd....'
        const bearerToken = bearer[1];  // fetching 1st part which is token..omitting bearer word
        if(bearerToken == null) return res.sendStatus(401);

        jwt.verify(bearerToken, 'my_secret_key', (err, data) => {
            if(err) return res.sendStatus(403);
            req.token = bearerToken;
            next();
        });
    } else {
        res.sendStatus(403);
    }
}

// module.exports = { ensureJwtToken };

app.listen(9000, '0.0.0.0', function () {
    console.log(`App now listening on server: http://localhost:${9000}`);
});

