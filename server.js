var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var open = require('open');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var service = require('./service.js');

io.on('connection', function (socket) {
    console.log("socket connection established");

    setInterval(function () {
        var self = this;
        var temperature = "";
        setTimeout(function () {
            self.temperature = service.readTemperature();
        }, 5000);
        socket.emit('temperature',self.temperature);
        console.log('temperature emitted'+self.temperature);
    }, 5000);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('assets'));

var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/board/:pin/:command', function (req, res) {
    var pin = req.params.pin;
    var command = req.params.command;
    var result = service.activateRelay(command, pin);
    res.json({ message: result });
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.use('/api', router);

http.listen(port);
open("http://localhost:" + port + '/api');

console.log('Magic happens on port ' + port);