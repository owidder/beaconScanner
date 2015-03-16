'use strict';

de_iteratec_beacon.beaconScanner.listController = (function() {
    var util = de_iteratec_beacon.util;
    var BeaconApi = de_iteratec_beacon.BeaconApi;
    var BeaconTypes = de_iteratec_beacon.BeaconTypes;

    var INTERVAL = 500;

    var listController = de_iteratec_beacon.beaconScanner.controller('ListController', function($scope, $http) {
        var beaconApi;


        function newBeaconData(beacons) {
            var beacon;

            for(beacon in beacons) {
                beacon.rssiWidth = 1; // Used when RSSI is zero or greater.
                if (beacon.rssi < -100) {
                    beacon.rssiWidth = 100;
                }
                else if (beacon.rssi < 0) {
                    beacon.rssiWidth = 100 + beacon.rssi;
                }
            }
            $scope.beacons = beacons;
        }

        if(util.isOnPhone()) {
            beaconApi = new BeaconApi(newBeaconData, INTERVAL, BeaconTypes.NODE, $http);
        }
        else {
            beaconApi = new BeaconApi(newBeaconData, INTERVAL, BeaconTypes.NODE, $http);
        }
    });

    return listController;
})();