'use strict';

de_iteratec_beacon.beaconScanner.listController = (function() {
    var util = de_iteratec_beacon.util;
    var beaconServer = de_iteratec_beacon.beaconServer;
    var BeaconApi = de_iteratec_beacon.BeaconApi;
    var BeaconTypes = de_iteratec_beacon.BeaconTypes;

    var INTERVAL = 1000;

    var scannerController = de_iteratec_beacon.beaconScanner.controller('ScannerController', function($scope, $http) {
        var beaconApi;


        function newBeaconData(beacons) {
            var beaconId, beacon;

            for(beaconId in beacons) {
                util.forEachKeyAndVal(beacons, function(uuid, beacon) {
                    if (util.isEmpty(beacon.displayName)) {
                        beaconServer.getBeaconName(beacon, $http)
                    }
                });
            }
            $scope.beacons = beacons;
        }

        if(util.isOnPhone()) {
            beaconApi = new BeaconApi(newBeaconData, INTERVAL, BeaconTypes.CORDOVA, $http);
        }
        else {
            beaconApi = new BeaconApi(newBeaconData, INTERVAL, BeaconTypes.NODE, $http);
        }
    });

    return scannerController;
})();