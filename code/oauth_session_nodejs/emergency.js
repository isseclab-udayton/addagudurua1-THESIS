'use strict';

var express = require('express')
var app = express()
const cors = require('cors')

//------------------------------------------------------------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

app.listen(4000, '0.0.0.0', function (){
    console.log(`App now listening on server: http://localhost:${4000}`);
    });


var fs = require('fs');

app.get('/', (req, res) => {
    const jsonFile = './private/auth.json';
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    var value = jsonParsed.emergency_level;
    console.log("The emergency value in JSON is: " + value);
    res.render('pages/emergency_view', { value: value });
});


app.get('/emergency', function (req, res) {
    const level = req.query.level;
    // console.log(level);
    if (level > 2) {
        console.log("Error");
        return;
    }

    const jsonFile = './private/auth.json';
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);

    const setVal = { ...jsonParsed, emergency_level: level };
    fs.writeFileSync('./private/auth.json', JSON.stringify(setVal));
    console.log("\nSet Value Successful");
    console.log("The value is now set to: ", +setVal.emergency_level);
    res.end();
});


app.get('/emergency?level', (req, res) => {
    console.log("\nGET/ (200) Success");
});


// app.post('/emergency', function (req, res) {

//     var jsonData = fs.readFileSync(jsonFile);
//     var jsonParsed = JSON.parse(jsonData);
//     console.log("\nPOST emergency call");
//     console.log("Emergency Level in JSON is:" +jsonParsed.emergency_level);
//     // console.log(jsonParsed);
//     if (jsonParsed.emergency_level == 1) {
// const setVal = { ...jsonParsed, emergency_level: 0 };
//         console.log("\nPOST/ (200) Success")
//         console.log("The value is set now to: " +setVal.emergency_level);
// fs.writeFileSync('./private/auth.json', JSON.stringify(setVal));
//     } else {
//         console.log("No changes needed");
//     }
//     res.end();
// });