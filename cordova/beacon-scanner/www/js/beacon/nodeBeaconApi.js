de_iteratec_beacon.NodeBeaconApi = function(aCallback, aInterval, aHttp) {
    var callback = aCallback;
    var interval = aInterval;
    var http = aHttp;

    var updateTimer;

    var PORT = 8080;
    var URL = 'http://localhost:' + PORT + '/scanner/scan';

    updateTimer = setInterval(function() {
        http.get(URL).success(function(data) {
            callback(data);
        }, interval);
    });
};
