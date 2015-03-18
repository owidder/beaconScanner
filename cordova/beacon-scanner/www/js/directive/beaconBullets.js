'use strict';

de_iteratec_beacon.beaconScanner.listController.directive('beaconBullets', function() {
    var util = de_iteratec_beacon.util;

    function drawGraph(scope, element, attr) {
        util.clearSvg();

        function createD3BulletDataFromBeacons(beacons) {

            var bulletList = [], bullet;

            util.forEachKeyAndVal(beacons, function(uuid, beacon) {
                var measure = util.transform(beacon.rssi, -127, 0, 0, 100);

                bullet = {
                    markers: [80],
                    ranges: [50, 100],
                    measures: [measure],
                    title: beacon.rssi,
                    subtitle: beacon.uuid.substring(0, 4)
                };

                bulletList.push(bullet);
            });

            return bulletList;
        }

        setInterval(function() {
            var beacons = scope.beacons;
            if(util.isSet(beacons)) {
                var beaconBulletData = createD3BulletDataFromBeacons(beacons);

                var margin = {top: 5, right: 40, bottom: 20, left: 120},
                    width = 960 - margin.left - margin.right,
                    height = 50 - margin.top - margin.bottom;

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

                node.exit().remove();
            }

        }, 1000);
    }

    return {
        restrict: 'E',
        link: drawGraph
    }
});



