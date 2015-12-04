angular.module('cel.ng').directive('pluginSampleD3', function() {
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
			}
		}
	}
});