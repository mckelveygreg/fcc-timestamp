// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Logger!
app.use((req,res,next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  
  console.log(`${method} ${path} - ${ip}`);
  next();
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp area
app.get('/api/timestamp/:date_string?', (req,res) => {
  const time = req.params.date_string;
  
  // moment testing
  console.log(time);
  const formatUTC = moment.unix(Number.parseInt(time));
  console.log(formatUTC);
  
  
  // return date_string or current date
  const date = time !== undefined ? new Date(time) : new Date();
  console.log(date);
  res.json({"unix": date.getTime(), "utc": date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});