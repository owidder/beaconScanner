'use strict';

de_iteratec_beacon.beaconScanner.listController.directive('beaconBullets', function() {
    var util = de_iteratec_beacon.util;

    var lastRssiValues = {};
    var smoothedRssiValues = {};

    function drawGraph(scope, element, attr) {
        util.clearSvg();

        var PROXIMITY_NEAR = "ProximityNear";
        var PROXIMITY_IMMEDIATE = "ProximityImmediate";
        var ALPHA = 0.2;

        function createBeaconId(beacon) {
            return beacon.uuid + '-' + beacon.major + '-' + beacon.minor
        }

        function smoothedRssiValue(beacon) {
            var id = createBeaconId(beacon);
            var rssi = beacon.rssi;
            var oldSmoothedValue = util.isSet(smoothedRssiValues[id]) ? smoothedRssiValues[id] : rssi;
            var newSmoothedValue = (1 - ALPHA) * oldSmoothedValue + ALPHA * rssi;
            smoothedRssiValues[id] = newSmoothedValue;

            return newSmoothedValue;
        }

        function lastRssiValue(beacon) {
            var id = createBeaconId(beacon);
            var rssi = beacon.rssi;
            var lastValue = util.isSet(lastRssiValues[id]) ? lastRssiValues[id] : 0;
            lastRssiValues[id] = rssi;

            return lastValue;
        }


        function createD3BulletDataFromBeacons(beacons) {

            var bulletList = [], bullet;

            util.forEachKeyAndVal(beacons, function(uuid, beacon) {
                var lastRssi = lastRssiValue(beacon);
                var smoothedRssi = smoothedRssiValue(beacon);

                var measure = util.transform(beacon.rssi, -127, 0, 0, 100);
                var lastMeasure = util.transform(lastRssi, -127, 0, 0, 100);
                var smoothedMeasure = util.transform(smoothedRssi, -127, 0, 0, 100);
                var proximity;
                switch(beacon.proximity) {
                    case PROXIMITY_NEAR:
                        proximity = "near";
                        break;

                    case PROXIMITY_IMMEDIATE:
                        proximity = "imm.";
                        break;

                    default:
                        proximity = "far";
                }
                var shortUuid = beacon.uuid.substring(0, 4);

                var secSinceLastMeasure = Math.floor((Date.now() - beacon.timeStamp) / 1000);

                bullet = {
                    markers: [smoothedMeasure],
                    ranges: [lastMeasure, 100],
                    measures: [measure],
                    title: util.isDefined(beacon.displayName) ? beacon.displayName : shortUuid + " / " + beacon.major + " / " + beacon.minor,
                    subtitle: proximity + " (" + beacon.rssi + ", " + beacon.accuracy + ", " + secSinceLastMeasure + "s)"
                };

                bulletList.push(bullet);
            });

            return bulletList;
        }

        function createFakeBeacons() {
            var beacon = {
                uuid: "1337",
                major: "iCanHas",
                minor: "beacons",
                rssi: util.randomNumberBetweenLowerAndUpper(-100, -10),
                accuracy: 0.0,
                timeStamp: Date.now()
            }

            return {
                '1337': beacon
            };
        }

        setInterval(function() {
            var beacons = scope.beacons;

            if(!util.isSet(beacons) || Object.keys(beacons).length == 0) {
                beacons = createFakeBeacons();
            }

            var beaconBulletData = createD3BulletDataFromBeacons(beacons);

            var margin = {top: 5, right: 40, bottom: 20, left: 120},
                width = $(window).width() - margin.left - margin.right,
                height = 50;

            var chart = d3.bullet()
                .width(width)
                .height(height);

            var node = d3.select("body").selectAll("svg")
                .data(beaconBulletData);

            var nodeEnter = node
                .enter()
                .append("svg")
                .attr("class", "bullet")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var c = nodeEnter.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);

            node.select("g")
                .transition()
                .call(chart.duration(1000));

            var title = c.append("g")
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + height / 2 + ")");


            title.append("text")
                .attr("class", "title")
                .text(function(d) {
                    return d.title;
                });

            title.append("text")
                .attr("class", "subtitle")
                .attr("dy", "1em")
                .text(function(d) { return d.subtitle; });

            node.select("g")
                .transition()
                .call(chart.duration(500));

            node.select(".title")
                .transition()
                .text(function(d) {return d.title});

            node.select(".subtitle")
                .transition()
                .text(function(d) {return d.subtitle});

            node.exit().remove();


        }, 1000);
    }

    return {
        restrict: 'E',
        link: drawGraph
    }
});



