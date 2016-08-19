function initMap (element, title, subtext, geoJson, data, ranges, colors, rangeTexts) {
	echarts.util.mapData.params.params.HK = {
		getGeoJson: function (callback){ callback(geoJson) }
	}
	var max = 0, min;
	if (data.length > 0)
		min = data[0].value;

	for (var i = 0; i < data.length; i++) {
		if (data[i].value < min)
			min = data[i].value;
		if (data[i].value > max)
			max = data[i].value;
	}
	ranges[0].start = min;
	ranges[ranges.length-1].end = max;

	var option = {
		title : {
			text : title,
			subtext: subtext
		},
		tooltip : {
			trigger: 'item',
			formatter : function (params) {
				return params.name+" "+params.value;
			}
		},
		toolbox: {
			show : true,
			orient : 'vertical',
			x: 'right',
			y: 'center',
			feature : {
				mark : {show: true, title: "Marcar"},
				markUndo : { title: "Deshacer"},
				markClear : { title: "Limpiar"},
				restore : {show: true, title: "Restaurar"},
				saveAsImage : {show: true, title: "Guardar"}
			}
		},
		dataRange: {
			min: min,
			max: max,
			splitNumber : ranges.length,
			realtime: false,
			calculable : true,
			//splitList : ranges,
			color: colors
		},
		series : [
			{
				name: title,
				type: 'map',
				roam: true,
				mapType: 'HK',
				data: data,
				itemStyle:{
					normal: {
						borderColor: 'black',
						borderWidth: 1
					},
					emphasis:{
						label:{show:true}
					}
				}
			}
		]
	};
					
	var myChart = echarts.init(document.getElementById(element));
	myChart.setOption(option);
}
function proccessJSON (json) {
	var ranges = [
		{
			start: 0,
			end: 8000000
		},
		{
			start: 8000001,
			end: 12000000
		},
		{
			start: 12000001,
			end: 15175862
		}
	];
	colors = ['#FF0000','#FFFFFF','#00FF00'];
	initMap('plot', 'México', 'Inmigración', json, inmigration_data, ranges, colors, ['Alto','Medio' ,'Bajo']);
}

function getData () {
	$.getJSON('estados.json',proccessJSON);
}
$(document).on("ready", getData);