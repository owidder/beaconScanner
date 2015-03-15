'use strict';

de_iteratec_beacon.beaconScanner.listController = (function() {
    var util = de_iteratec_beacon.util;
    var Beacon = de_iteratec_beacon.Beacon;
    var BeaconTypes = de_iteratec_beacon.BeaconTypes;

    var INTERVAL = 500;

    var listController = de_iteratec_beacon.beaconScanner.controller('ListController', function($scope, $http, $routeParams) {
        var beacon;


        function newData(data) {
            $scope.beacons = data;
        }

        if(util.isSet($routeParams.node)) {
            beacon = new Beacon(newData, INTERVAL, BeaconTypes.NODE, $http);
        }
        else {
            beacon = new Beacon(newData, INTERVAL, BeaconTypes.NODE, $http);
        }
    });

    return listController;
})();