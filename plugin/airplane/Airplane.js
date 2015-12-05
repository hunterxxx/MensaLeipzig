angular.module('cel.ng').directive('pluginAirplane', function() {
	return {
		link: function(scope, elem) {
			// Unwrap jquery/jqLite wrapped element.
			var rootElem = d3.select(elem.get(0)).append('div')
				.style('position', 'absolute')
				.style('width', '100%')
				.style('height', '100%')
				.style('background-color', 'blue');

			// Do stuff with root elem.


			// hook up the reload events
			scope.component.$reload = function() {
				// The reload event is triggered by the application when the component is required to get new data.
				// This can be for example due to a change in filters.
				// You can use the pql service to send queries to the server.
				// You can use the selection service to updated and set selections.
				console.log('reload event has been triggered.');


				pqlService.query('TABLE(COUNT_TABLE("_CEL_O2C_ACTIVITIES"))', false, scope.component).then(function(result) {
					console.log(result);
					// the result returned by the pql service contains a tabular view on the data table as well as some meta data.
					// You can access the data using the result.data property. result.data is a two-dimensional array which contains
					// the values for the selected data field.

					// If you have errors in your query or it can not be processed for a specific reason, there is a result.message property which
					// contains the error message generated by the server.

					// In the next step, you need to update your data binding in the d3 component using the enter and exit selections.
				});
			}
		}
	}
});
