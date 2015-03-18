/**
 * Created by uwe on 18.03.15.
 */

de_iteratec_beacon.beaconServer = (function() {
    var util = de_iteratec_beacon.util;

    function getBeaconName(beacon, http) {
        var BASE_URL = 'http://iterabeacon.hh.iteratec.de:8080/beaconServer/api'
        var url = BASE_URL + '/beaconDevice?filter.uuid=' + beacon.uuid +
                                '&filter.major=' + beacon.major +
                                '&filter.minor=' + beacon.minor;
        var restPromise = http.get(url)
        restPromise.success(function(restResponse) {
            if (util.isDefined(restResponse.length) && (restResponse.length == 1) && (util.isDefined(restResponse[0].displayName))) {
                beacon.displayName = restResponse[0].displayName;
            } else {
                var shortUuid = beacon.uuid.substring(0, 4);
                beacon.displayName = shortUuid+'/'+beacon.major+'/'+beacon.minor;
            }
        });
        restPromise.error(function() {
            console.log("error calling REST URL " + url);
        })
    }

    return {
        getBeaconName: getBeaconName
    }

}) ();