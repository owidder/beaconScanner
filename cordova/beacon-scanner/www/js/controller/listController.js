'use strict';

de_iteratec_beacon.beaconScanner.listController = (function() {
    var util = de_iteratec_beacon.util;

    var listController = de_iteratec_beacon.beaconScanner.controller('ListController', function($scope, $http, $routeParams) {
        if(util.isSet($routeParams.node)) {
            
        }
    });

    return listController;
})();