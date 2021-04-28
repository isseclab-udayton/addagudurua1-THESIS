'use strict';

var express = require('express');
var app = express();
const cors = require('cors');
// var jwtTokenRequire = require('./testjwt');
//------------------------------------------------------------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

app.listen(4000, '0.0.0.0', function (){
    console.log(`App now listening on server: http://localhost:${4000}`);
    });


var fs = require('fs');

// jwtTokenRequire = jwtTokenRequire.ensureJwtToken();

app.get('/', (req, res) => {
    const jsonFile = './private/auth.json';
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    var value = jsonParsed.emergency_level;
    console.log("\nThe emergency value in JSON is: " + value);
    res.render('pages/emergency_view', { value: value });
});


app.get('/emergency', function (req, res) {
    const level = req.query.level;
    // console.log(level);
    if (level <0 || level >2) {
        console.log("Error");
        res.send("Values should be either 0 or 1");
        return;
    }

    const jsonFile = './private/auth.json';
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);

    const setVal = { ...jsonParsed, emergency_level: level };
    fs.writeFileSync('./private/auth.json', JSON.stringify(setVal));
    console.log("\nSet Value Successful");
    console.log("The value is now set to: ", +setVal.emergency_level);
    console.log("The page is now being redirected to '/' ");
    res.redirect('/');
    res.end();
});


app.get('/emergency?level', (req, res) => {
    console.log("\nGET/ (200) Success");
});