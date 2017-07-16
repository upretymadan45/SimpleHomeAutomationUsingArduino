(function () {
    "use strict";

    $(function () {

        $('#control').on('click', function () {
            var source = $(this);
            var pin = $('#selectPin').val();
            var state = $(this).attr('control-flag');
            callServer(pin, state, source);
            console.log(pin + state);
        });

        function callServer(pin, state, source) {
            $.ajax({
                url: 'api/board/' + pin + '/' + state,
                method: 'get',
                beforeSend: function () {
                    source.html('Sending');
                },
                success: function (result) {
                    var controlFlag = result.message;
                    source.attr('control-flag', controlFlag);
                    source.html(controlFlag === '1' ? 'OFF' : 'ON');
                    console.log(result);
                },
                error: function (error) {
                    source.html('Failed');
                }
            });
        }
    });
})();