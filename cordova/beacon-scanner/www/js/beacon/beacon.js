de_iteratec_beacon.BeaconTypes = {
    NODE: 'NODE',
    CORDOVA: 'CORDOVA'
};

de_iteratec_beacon.Beacon = function(aCallback, aInterval, type, aHttp) {
    var NodeBeacon = de_iteratec_beacon.NodeBeacon;
    var CordovaBeacon = de_iteratec_beacon.CordovaBeacon;
    var BeaconTypes = de_iteratec_beacon.BeaconTypes;

    var callback = aCallback;
    var interval = aInterval;
    var http = aHttp;

    var beacon;

    if(type == BeaconTypes.NODE) {
        beacon = new NodeBeacon(callback, interval, http);
    }
    else {
        beacon = CordovaBeacon(callback, interval, http);
    }
};