var five = require("johnny-five");
var board = new five.Board();

module.exports = {
    //Arduino Realy onOff method
    activateRelay: function (msg, pin) {
        var command = msg;
        var pinNumber = pin;
        board.on("ready", function () {
            console.log("Board initialized");
        });
        var relay = new five.Relay(pinNumber);
        if (command == "0") {
            relay.on();
            return "1";
        }
        if (command == "1") {
            relay.off();
            return "0";
        }
    },
    readTemperature: function () {
        var self = this;
        var currentTemp = "";
        var temperature = new five.Thermometer({
            controller: "LM35",
            pin: "A0",
            freq: 5000
        });

        temperature.on('data', function () {
            self.currentTemp = this.celsius;
            //console.log(currentTemp);
        });

        console.log(self.currentTemp);
        return self.currentTemp;
    }
}