(function () {
    var socket = io();
    socket.on('connect', function () {
        console.log("connected to server");
    });

    socket.on('temperature', function (temperature) {
        var temperatureSelector = $('#temperature');
        var spinnerSelector = $('#spinner');

        if (temperature) {
            spinnerSelector.css('display', 'none');
            temperatureSelector.html(temperature);
        }

        console.log(temperature);
    });
})();
