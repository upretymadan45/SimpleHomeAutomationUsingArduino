// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

var service = require('./service.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('scripts'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/board/:pin/:command', function(req, res) {
    var pin =req.params.pin;
    var command = req.params.command;
    var result = service.activateRelay(command,pin);
    res.json({ message: result });   
});

router.get('/board/temperature', function(req,res){
    var temperature = service.readTemperature();
    console.log(temperature);
    res.json({currentTemperature:temperature});
});

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);