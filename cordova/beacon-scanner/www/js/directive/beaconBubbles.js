'use strict';

de_iteratec_beacon.beaconScanner.listController.directive('beaconBubbles', function() {
    var util = de_iteratec_beacon.util;

    function drawGraph(scope, element, attr) {
        util.clearSvg();

        function createD3BubbleDataFromBeacons(beacons) {
            var d3Data = {
                children: []
            };

            util.forEachKeyAndVal(beacons, function(id, beacon) {
                d3Data.children.push({
                    name: beacon.uuid.substring(0, 4),
                    value: beacon.rssiWidth,
                    uuid: beacon.uuid
                });
            });

            return d3Data;
        }

        var diameter = 960,
            format = d3.format(",d"),
            color = d3.scale.category20c();

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("body").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        scope.$watch('beacons', function(beacons) {
            if(!util.isSet(beacons)) {
                return;
            }
            var beaconBubbleData = createD3BubbleDataFromBeacons(beacons);

            var node = svg.selectAll(".node")
                .data(
                    bubble.nodes(beaconBubbleData).filter(function (d){return !d.children;}),
                    function(d) {return d.uuid});

            var nodeEnter = node
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            nodeEnter.append("circle")
                .attr("r", function(d) { return d.value; })
                .style("fill", function(d) { return color(d.name); })
                .append("text")
                .style("text-anchor", "middle");

            nodeEnter.append("text")
                .text(function(d) { return d.name; });

            node.select("circle").transition()
                .attr("r", function(d) { return d.value; })
                .style("fill", function(d) { return color(d.name); });

            node.transition().attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

            node.exit().remove();


        });
    }

    return {
        scope: {
            beacons: '='
        },
        restrict: 'E',
        link: drawGraph
    }

});