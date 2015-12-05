angular.module('cel.ng').directive('pluginAirplane', function () {
    return {
        link: function (scope, elem, http) {
            // Unwrap jquery/jqLite wrapped element.
            function refreshGlobe ()
            {
                svg.selectAll(".land")
                    .data([topojson.feature(worldtopo, worldtopo.objects.land)])
                    .enter().append('path')
                    .attr('class','land')
                    .attr("d", path);
            }
            var width = 600;
            var height = 400;

            var sc = Math.min(width,height) * 0.5;
            var lat = 0;
            var projection = d3.geo.orthographic()
                .scale(sc)
                .translate([width/2,height/2])
                .rotate([lat,0])
                .clipAngle(90);
            var path = d3.geo.path()
                .projection(projection);

            var graticule = d3.geo.graticule();

            var svg = d3.select(elem.get(0)).append('div').append("svg")
                .attr("width", width)
		.attr('id', 'svg-canvas')
                .attr("height", height);

            console.log(worldtopo);

            refreshGlobe();

            setInterval(function(){
                lat = lat +1.50
                projection.rotate([lat,0]);
                svg.selectAll(".land")
                    .attr("d", path);
	        svg.selectAll(".point").attr("d", path);
            },100);



            // Do stuff with root elem.

            // hook up the reload events
            scope.component.$reload = function () {
                // The reload event is triggered by the application when the component is required to get new data.
                // This can be for example due to a change in filters.
                // You can use the pql service to send queries to the server.
                // You can use the selection service to updated and set selections.
                console.log('reload event has been triggered.');
		pqlService.query(
			'TABLE( ' + 
				'"AirlineRoutes.csv"."Airline", ' +
				'"AirlineRoutes.csv"."Equipment", ' +
				'"SourceAirports.csv"."Latitude", ' +
				'"SourceAirports.csv"."Longitude", ' +
				'"TargetAirports.csv"."Latitude", ' +
				'"TargetAirports.csv"."Longitude"' + 
			') LIMIT 70000', 
		false, scope.component).then(function(result) {
			console.log(result);
			var airlineArray = [];
			svg.selectAll(".point").remove();
			for(i=0; i<result.data.length; i++) {
				svg.append("path")
	    				.datum({type: "Point", coordinates: [result.data[i][2], result.data[i][3]]})
	    				.attr("class", "point")
	    				.attr("d", path);
			}
		});
            }
        }
    }
});
