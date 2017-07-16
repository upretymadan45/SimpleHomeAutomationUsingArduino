(function () {
    "use strict";
    var socket = io();
    socket.on('connect', function () {
        console.log("connected to server");
    });

    socket.on('temperature', function (temperature) {
        var temperatureSelector = $('#temperature');

        if (temperature) {
            temperatureSelector.html("");
            displayChart(temperature);
        }

        console.log(temperature);
    });

    function displayChart(temperature) {
        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Temp(°C)', temperature]
            ]);

            var options = {
                width: 400, height: 120,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

            chart.draw(data, options);
        }
    }
})();
