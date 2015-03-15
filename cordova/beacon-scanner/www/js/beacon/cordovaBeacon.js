de_iteratec_beacon.CordovaBeacon = function(aCallback, aInterval) {
    var callback = aCallback;
    var interval = aInterval;

    // Specify your beacon 128bit UUIDs here.
    var regions = [
            {uuid:'20CAE8A0-A9CF-11E3-A5E2-0800200C9A66'}
        ];

    // Dictionary of beacons.
    var beacons = {};

    // Timer that displays list of beacons.
    var updateTimer = null;

    function initialize() {
        document.addEventListener('deviceready', onDeviceReady, false);
    };

    function onDeviceReady() {
        // Specify a shortcut for the location manager holding the iBeacon functions.
        window.locationManager = cordova.plugins.locationManager;

        // Start tracking beacons!
        startScan();

        // Display refresh timer.
        updateTimer = setInterval(callback, interval);
    }

    function startScan() {
        // The delegate object holds the iBeacon callback functions
        // specified below.
        var delegate = new locationManager.Delegate();

        // Called continuously when ranging beacons.
        delegate.didRangeBeaconsInRegion = function(pluginResult)
        {
            //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
            for (var i in pluginResult.beacons)
            {
                // Insert beacon into table of found beacons.
                var beacon = pluginResult.beacons[i];
                beacon.timeStamp = Date.now();
                var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
                beacons[key] = beacon;
            }
        };

        // Called when starting to monitor a region.
        // (Not used in this example, included as a reference.)
        delegate.didStartMonitoringForRegion = function(pluginResult) {
            //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
        };

        // Called when monitoring and the state of a region changes.
        // (Not used in this example, included as a reference.)
        delegate.didDetermineStateForRegion = function(pluginResult) {
            //console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
        };

        // Set the delegate object to use.
        locationManager.setDelegate(delegate);

        // Request permission from user to access location info.
        // This is needed on iOS 8.
        locationManager.requestAlwaysAuthorization();

        // Start monitoring and ranging beacons.
        for (var i in regions) {
            var beaconRegion = new locationManager.BeaconRegion(
                i + 1,
                regions[i].uuid);

            // Start ranging.
            locationManager.startRangingBeaconsInRegion(beaconRegion)
                .fail(console.error)
                .done();

            // Start monitoring.
            // (Not used in this example, included as a reference.)
            locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();
        }
    }

    this.getBeacons = function() {
        return beacons;
    };

    initialize();
};