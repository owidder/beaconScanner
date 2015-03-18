// Requires NodeJS and "noble" module: https://github.com/sandeepmistry/noble
// Based on: https://github.com/sandeepmistry/noble/issues/62
var util = require('./util.js');

var beacons = {};

exports.startFake = function(interval) {

    setInterval(function() {
        var randomNumberOfBeacons, i, beacon, uuid, rssi, rndOffset;

        if(Object.keys(beacons).length > 0) {
            util.forEachKeyAndVal(beacons, function(id, beacon) {
                rndOffset = util.randomNumberBetweenLowerAndUpper(-20, +20)
                beacon.rssi += rndOffset;
                if(beacon.rssi > 0 || beacon.rssi < -100) {
                    beacon.rssi = util.randomNumberBetweenLowerAndUpper(-100, -10);
                }
            });
        }
        else {
            proximityValues = ["ProximityImmediate","ProximityNear","ProximityFar"];
            randomNumberOfBeacons = util.randomNumberBetweenLowerAndUpper(5, 10);
            for(i = 0; i < randomNumberOfBeacons; i++) {
                beacon = {};
                uuid = util.guid();
                rssi = util.randomNumberBetweenLowerAndUpper(-100, -10);
                beacon.uuid = '20CAE8A0-A9CF-11E3-A5E2-0800200C9A66';
                beacon.major = 125+i;
                beacon.minor = 18969+i;
                beacon.accuracy = '1.1';
                beacon.proximity = proximityValues[i%3];
                beacon.rssi = rssi;
                beacons[uuid] = beacon;
            }
        }
    }, interval);
};

exports.startScan = function(interval) {
    var noble = require('noble');

    noble.on('stateChange', function(state) {
        if (state === 'poweredOn' ) {
            noble.startScanning([], false);
        } else {
            noble.stopScanning();
        }
    });

    noble.on('discover', function(peripheral) {
        peripheral.connect(function(error) {});

        peripheral.on('connect',function(){});

        peripheral.on('rssiUpdate',function(rssi){
            var uuid = peripheral.uuid;

            console.log(uuid + " : " + rssi);

            if(!util.isSet(beacons[uuid])) {
                beacons[uuid] = {
                    uuid: uuid
                };
            }
            beacons[uuid].rssi = rssi;
        });

        setInterval(function(){
            peripheral.updateRssi();
        }, interval);
    });
};

exports.beacons = beacons;