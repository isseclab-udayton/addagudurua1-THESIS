'use strict';

var express = require('express')
var app = express()
const cors = require('cors')

//------------------------------------------------------------------------------------------------------------------------------------------

app.set('view engine', 'ejs');

app.listen(4000, () => console.log(`App now listening on server: http://localhost:${4000}`))


var fs = require('fs');
const jsonFile = './private/auth.json';

app.get('/emergency?level=0', (req, res) => {
    console.log("\nGET/ (200) Success");
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    var value = jsonParsed.emergency_level;
    console.log("The emergency value is: " + value);
    res.render('pages/emergency_view', { value: value });
    res.end();
});


app.get('/emergency', function (req, res) {
    const level = req.query.level; //set url parameter
    if(level >2)
    {
        console.log("Error");
        return;
        res.end();
    }
    
    var jsonData = fs.readFileSync(jsonFile);
    var jsonParsed = JSON.parse(jsonData);
    const setVal = { ...jsonParsed, emergency_level: level };
    fs.writeFileSync('./private/auth.json', JSON.stringify(setVal));
    res.end();
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

