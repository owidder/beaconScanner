de_iteratec_beacon.BeaconTypes = {
    NODE: 'NODE',
    CORDOVA: 'CORDOVA'
};

de_iteratec_beacon.BeaconApi = function(aCallback, aInterval, type, aHttp) {
    var NodeBeaconApi = de_iteratec_beacon.NodeBeaconApi;
    var CordovaBeaconApi = de_iteratec_beacon.CordovaBeaconApi;
    var BeaconTypes = de_iteratec_beacon.BeaconTypes;

    var callback = aCallback;
    var interval = aInterval;
    var http = aHttp;

    var beacon;

    if(type == BeaconTypes.NODE) {
        beacon = new NodeBeaconApi(callback, interval, http);
    }
    else {
        beacon = CordovaBeaconApi(callback, interval, http);
    }
};