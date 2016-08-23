function hexToRGB (hex) {
	var r,g,b;
	hex = hex.replace('#','');
	r = parseInt(hex.substring(0,2), 16);
	g = parseInt(hex.substring(2,4), 16);
	b = parseInt(hex.substring(4,6), 16);
	return [r,g,b];
}
function getBestTextColor (rgb) {
	var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
		
	if(o > 125) {
		return "#000000";
	}else{ 
		return "#FFFFFF";
	}
}
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
		var color = colorScale([values[counter]]);
		var shape = {
			type: 'rect',
			x0: rectangles[i][0],
			y0: rectangles[i][1],
			x1: rectangles[i][2],
			y1: rectangles[i][3],
			line: {
				width: 2
			},
			fillcolor: color
		};

		shapes.push(shape);
		var annotation = {
			x: (rectangles[i][0] + rectangles[i][2]) / 2,
			y: (rectangles[i][1] + rectangles[i][3]) / 2,
			text: String(values[counter]),
			font: {
				color: getBestTextColor(hexToRGB(color))
			},
			showarrow: false
		};
		annotations.push(annotation);
		
		x_trace.push((rectangles[i][0] + rectangles[i][2]) / 2);
		y_trace.push((rectangles[i][1] + rectangles[i][3]) / 2);
		text.push(String(items[counter][property_text]));
		
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
