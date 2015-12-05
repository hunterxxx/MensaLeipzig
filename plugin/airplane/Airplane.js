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
		svg.insert("path", ".land")
	    		.datum({type: "Point", coordinates: [0, 0]})
	    		.attr("class", "point")
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


                pqlService.query('TABLE(COUNT_TABLE("_CEL_O2C_ACTIVITIES"))', false, scope.component).then(function (result) {
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
