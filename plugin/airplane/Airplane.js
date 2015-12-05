angular.module('cel.ng').directive('pluginAirplane', function() {
	return {
		link: function(scope, elem) {
			// Unwrap jquery/jqLite wrapped element.
			var rootElem = d3.select(elem.get(0)).append('svg')
				.attr('id', 'customsvg')
				.style('width', '326px')
				.style('height', '200px');

   			d3.selectAll('#customsvg').append("svg:image")
	        		.attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/9/91/Winkel_triple_projection_SW.jpg")
	        		.attr("width", 326)
	        		.attr("height", 200);
			var projection = d3.geo.winkel3()
				.scale(326)
				.translate([326 / 2, 200 / 2])
	    			.precision(.1);
			// Do stuff with root elem.


			// hook up the reload events
			scope.component.$reload = function() {
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
					')', 
				false, scope.component).then(function(result) {
					var airlineArray = [];
					for(i=0; i<result.data.length; i++) {
						airlineArray[i] = [];
						airlineArray[i][0] = result.data[i][0];
						airlineArray[i][1] = result.data[i][1];
						var sourceXY = projection([result.data[i][2], result.data[i][3]]);
						airlineArray[i][2] = sourceXY[0];
						airlineArray[i][3] = sourceXY[1];
						var destXY = projection([result.data[i][4], result.data[i][5]]);
						airlineArray[i][4] = destXY[0];
						airlineArray[i][5] = destXY[1];
						d3.selectAll('#customsvg').append('svg:circle').attr('cx', sourceXY[0]).attr('cy', sourceXY[1]).attr('r', 1).attr('fill', 'red');
					}
					console.log(airlineArray);
				});
			}
		}
	}
});
