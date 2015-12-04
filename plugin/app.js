// Load the plugin's templates
angular.module('cel.ng').requires.push('plugin.templates');
// add our plugin to the component registry.
angular.module('cel.ng').run(function(componentFactory) {
	// register your component here
	componentFactory.registerComponent('sample-component', {
		fullPath: true,
        view: 'plugin/sample/Sample',
        icon: 'image-lg',
        category: 'design_components',
        name: 'Sample Component',
        placeholder: 'app/pages/analysis/component_browser/CeNewComponentPlaceholder.jade',
        hasBackground: true,
        hasBorder: true,
        defaults: {
            width: 30,
            height: 10      
        }
	});	
	componentFactory.registerComponent('sample-d3-component', {
		fullPath: true,
        view: 'plugin/sample_d3/SampleD3',
        icon: 'image-lg',
        category: 'design_components',
        name: 'Sample D3 Component',
        placeholder: 'app/pages/analysis/component_browser/CeNewComponentPlaceholder.jade',
        hasBackground: true,
        hasBorder: true,
        defaults: {
            width: 30,
            height: 10      
        }
	});	

});
