// Requires NodeJS and "noble" module: https://github.com/sandeepmistry/noble
// Based on: https://github.com/sandeepmistry/noble/issues/62
var noble = require('noble');
var util = require('./util.js');

var beacons = {};

exports.beacons = beacons;

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

        console.log("rssi = " + rssi);

        if(!util.isSet(beacons[uuid])) {
            beacons[uuid] = {
                uuid: uuid
            };
            beacons[uuid].rssi = rssi;
        }
	});
 
	setInterval(function(){
  		peripheral.updateRssi();
	}, 100);
});
