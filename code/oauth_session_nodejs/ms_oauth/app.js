//npm libraries

const express = require('express');
const { json, urlencoded } = express;

const cors = require('cors');
const path = require('path');
const router = require('./api/routes');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(router);



// establishing server
app.listen(PORT, function () {
  console.log('Server started on http://localhost:' + PORT);
});


// setting the initial routes
app.get('/', function (req, res) {
  res.render('pages/auth');
});