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
	}

});