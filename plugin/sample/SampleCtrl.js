angular.module('cel.ng').controller('pluginSampleCtrl', function($scope, pqlService, selectionService) {
	var vm = this;
	vm.myValue = 'Sample value from controller';

	// hook up the reload events
	$scope.component.$reload = function() {
		// The reload event is triggered by the application when the component is required to get new data.
		// This can be for example due to a change in filters.
		// You can use the pql service to send queries to the server.
		// You can use the selection service to updated and set selections.
		console.log('reload event has been triggered.');

		// To load data from the server, use the pql service. Here are some examples:
		// pqlService takes three parameters: the query, if it is a multi query (you can set this to false all the time) and the component.
		// As the component you can always pass $scope.component.
		//
		// It returns a promise.
		pqlService.query('TABLE(COUNT_TABLE("_CEL_O2C_ACTIVITIES"))', false, $scope.component).then(function(result) {
			console.log(result);
			// the result returned by the pql service contains a tabular view on the data table as well as some meta data.
			// You can access the data using the result.data property. result.data is a two-dimensional array which contains
			// the values for the selected data field.

			// If you have errors in your query or it can not be processed for a specific reason, there is a result.message property which
			// contains the error message generated by the server.

			// If you for example want to update the value displayed by this sample component with the count of a certain table you
			// just calculated, then just assign the value.
			vm.myValue = _.deepGet(result, 'data.0.0');
			// or result.data[0][0]
		});

	}

});