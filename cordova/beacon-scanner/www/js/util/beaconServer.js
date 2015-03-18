/**
 * Created by uwe on 18.03.15.
 */

de_iteratec_beacon.beaconServer = (function() {
    function getBeaconName(beacon, http) {
        var BASE_URL = 'http://iterabeacon.hh.iteratec.de:8080/beaconServer/api'
        var url = BASE_URL + '/beaconDevice?filter.uuid=' + beacon.uuid +
                                '&filter.major=' + beacon.major +
                                '&filter.minor=' + beacon.minor;
        var restPromise = http.get(url)
        restPromise.success(function(restResponse) {
            beacon.displayName = restResponse[0].displayName;
        });
        restPromise.error(function() {
            console.log("error calling REST URL " + url);
        })
    }

    return {
        getBeaconName: getBeaconName
    }

}) ();