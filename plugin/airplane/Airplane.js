angular.module('cel.ng').directive('pluginAirplane', function() {
	return {
		link: function(scope, elem) {
			// Unwrap jquery/jqLite wrapped element.
			var rootElem = d3.select(elem.get(0)).append('div')
				.style('position', 'absolute')
				.style('width', '100%')
				.style('height', '100%')
				.append('img')
				.attr('src', 'https://upload.wikimedia.org/wikipedia/commons/9/91/Winkel_triple_projection_SW.jpg')
				.style('width', '326px')
				.style('height', '200px');
			var projection = d3.geo.winkel3()
				.scale(150)
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
					for(i=0; i<result.data.length; i++){
						for(j=0; j<result.data[i].length; j++){
							console.log(result.data[i][j]);
						}						
					}
				});
			}
		}
	}
});
