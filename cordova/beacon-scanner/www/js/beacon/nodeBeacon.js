de_iteratec_beacon.NodeBeacon = function(aHttp, aCallback, aInterval) {
    var http = aHttp;
    var callback = aCallback;
    var interval = aInterval;

    var updateTimer;

    var PORT = 8080;
    var URL = 'http://localhost:' + PORT + '/scanner/scan';

    updateTimer = setInterval(function() {
        http.get(URL).success(function(data) {
            callback(data);
        });
    });
};
