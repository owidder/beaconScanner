'use strict';

de_iteratec_beacon.beaconScanner = (function() {

    var beaconScanner = angular.module('beaconScanner', [
        'ngRoute'
    ]);

    beaconScanner.config(function($routeProvider) {
        $routeProvider.when('/list', {
                templateUrl: 'ui/partials/list.html',
                controller: 'ListController'
            }
        ).
        otherwise({
                redirectTo: '/list'
            }
        );
    });

    beaconScanner.factory('_d3', function() {
        return d3;
    });

    return beaconScanner;
})();