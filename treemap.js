function initTreemap (items, property_text, property_value, colors) {
	var d3 = Plotly.d3;
	var max_value = d3.max( items, function(item) { return item[property_value] });
	var min_value = d3.min( items, function(item) { return item[property_value] });
	var colorScale = d3.scale.linear().domain([min_value, max_value]).range(colors);

	var shapes = [];
	var annotations = [];
	var counter = 0;

	var x_trace = [];
	var y_trace = [];
	var text = [];

	var values = items.map(function(item){
		return item[property_value];
	})
	var rectangles = Treemap.generate(values, 100, 100);

	for (var i in rectangles) {
		var shape = {
		        		type: 'rect',
						x0: rectangles[i][0],
						y0: rectangles[i][1],
						x1: rectangles[i][2],
						y1: rectangles[i][3],
						line: {
								width: 2
							},
						fillcolor: colorScale([values[counter]])
				};
		shapes.push(shape);
		var annotation = {
		    				x: (rectangles[i][0] + rectangles[i][2]) / 2,
							y: (rectangles[i][1] + rectangles[i][3]) / 2,
							text: String(values[counter]),
							showarrow: false
				};
		annotations.push(annotation);
		
		// For Hover Text
		x_trace.push((rectangles[i][0] + rectangles[i][2]) / 2);
		y_trace.push((rectangles[i][1] + rectangles[i][3]) / 2);
		text.push(String(items[counter][property_text]));
				
		// Incrementing Counter		
		counter++;
	}

	var trace0 = {
		x: x_trace,
		y: y_trace,
		text: text,
		mode: 'text',
		type: 'scatter'
	};

	var layout = {
		height: 700,
		width: 700,
		shapes: shapes,
		hovermode: 'closest',
		annotations: annotations,
		xaxis: {
			showgrid: false,
			zeroline: false
		},
		yaxis: {
			showgrid: false,
			zeroline: false
		}
	};

	Plotly.newPlot('myDiv', [trace0], layout);

}


window.onload = function () {
	var items = [{ value: 250, name: "valor 1"}, { value: 443, name: "valor 2"}, 
	{ value: 500, name: "valor 3"}, { value: 25, name: "valor 4"}, { value: 7, name: "valor 5"}];
	initTreemap (items, "name", "value", ['red','blue']); 
};
