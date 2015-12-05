function CoordsToX(lon, lat) {

}

function CoordsToY(lon, lat) {

}

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
				.style('width', '100%')
				.style('height', 'auto');

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
					console.log(result);
				});
			}
		}
	}
});
