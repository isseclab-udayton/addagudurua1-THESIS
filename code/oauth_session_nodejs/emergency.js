'use strict';

var express = require('express')
var app = express()
const cors = require('cors')

//------------------------------------------------------------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

app.listen(4000, () => console.log(`App now listening on server: http://localhost:${4000}`))


var fs = require('fs');
const jsonFile = './private/auth.json';

// fs.readFile(jsonFile, 'utf8', function (err, data) {
//     if (err) throw err; // we'll not consider error handling for now
//     var jsonParsed = JSON.parse(data);
// });

// var jsonData = fs.readFileSync(jsonFile);
// var jsonParsed = JSON.parse(jsonData);
// console.log("Emergency Level in JSON is:" ,jsonParsed.emergency_level);


app.get('/', (req, res) => {
    console.log("\nGET/ (200) Success");
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    var value = jsonParsed.emergency_level;
    console.log("The emergency value is: " +value);
    res.render('pages/emergency_view', { value: value });
});

app.post('/emergency', function (req, res) {

    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    // res.render('pages/emergency_view');
    console.log("\nPOST emergency call");
    console.log("Emergency Level in JSON is:" +jsonParsed.emergency_level);
    // console.log(jsonParsed);
    if (jsonParsed.emergency_level == 1) {
        // console.log("Value of emergency in JSON is: ", +emerg_value);
        // console.log(jsonParsed);
        const setVal = {...jsonParsed,emergency_level:0};
        console.log(setVal);
        fs.writeFileSync('./private/auth.json', JSON.stringify(setVal));        
    } else {
        console.log("No changes needed");
    }
});