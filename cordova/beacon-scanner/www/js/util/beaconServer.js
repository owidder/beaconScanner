/**
 * Created by uwe on 18.03.15.
 */

de_iteratec_beacon.beaconServer = (function() {
    var util = de_iteratec_beacon.util;
    var BASE_URL = 'http://iterabeacon.hh.iteratec.de:8080/beaconServer/api';
    var beacons = {};

    function retrieveBeaconNameFromServer(beacon, http) {
        var url = BASE_URL + '/beaconDevice?filter.uuid=' + beacon.uuid +
                                '&filter.major=' + beacon.major +
                                '&filter.minor=' + beacon.minor;
        var restPromise = http.get(url)
        restPromise.success(function(restResponse) {
            if (util.isDefined(restResponse.length) && (restResponse.length == 1) && (util.isDefined(restResponse[0].displayName))) {
                beacons[getDefaultBeaconName(beacon)] = restResponse[0].displayName;
            }
        });
        restPromise.error(function() {
            console.log("error calling REST URL " + url);
        })
    }

    function getDefaultBeaconName(beacon) {
        var shortUuid = beacon.uuid.substring(0, 4);
        return shortUuid+'/'+beacon.major+'/'+beacon.minor;
    }

    function getBeaconName(beacon, http) {
        var defaultBeaconName = getDefaultBeaconName(beacon);
        if (util.isDefined(beacons[defaultBeaconName])) {
            beacon.displayName = beacons[defaultBeaconName];
        } else {
            retrieveBeaconNameFromServer(beacon, http);
            //return defaultBeaconName
        }
    }

    return {
        getBeaconName: getBeaconName
    }

}) ();