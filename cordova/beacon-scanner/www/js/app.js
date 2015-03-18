'use strict';

de_iteratec_beacon.beaconScanner = (function() {

    var beaconScanner = angular.module('beaconScanner', [
        'ngRoute'
    ]);

    beaconScanner.config(function($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'ui/partials/list.html',
                controller: 'ScannerController'
            })
            .when('/bubbles', {
                templateUrl: 'ui/partials/bubbles.html',
                controller: 'ScannerController'
            })
            .when('/bullets', {
                templateUrl: 'ui/partials/bullets.html',
                controller: 'ScannerController'
            })
            .otherwise({
                redirectTo: '/bullets'
            }
        );
    });

    return beaconScanner;
})();