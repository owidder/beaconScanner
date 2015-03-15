// Requires NodeJS and "noble" module: https://github.com/sandeepmistry/noble
// Based on: https://github.com/sandeepmistry/noble/issues/62
 
var noble = require('noble');

var beacons = {};

var signal = {
    rssi: 0,
    uuid: '-'
};

exports.signal = signal;

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


        signal.rssi = rssi;
        signal.uuid = peripheral.uuid;
	});
 
	setInterval(function(){
  		peripheral.updateRssi();
	}, 100);
});
