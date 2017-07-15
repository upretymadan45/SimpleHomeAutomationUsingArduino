var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var path = require('path');
var open = require('open');

var service = require('./service.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('scripts'));

var port = process.env.PORT || 8080;        
var router = express.Router();              

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


app.use('/api', router);

app.listen(port);
open("http://localhost:"+port+'/api');

console.log('Magic happens on port ' + port);