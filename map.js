var myChart;
function initMap (element, title, subtext, geoJson, data, colors, rangeTexts) {
	echarts.util.mapData.params.params.HK = {
		getGeoJson: function (callback){ callback(geoJson) }
	}
	var max = 0, min = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].value < min)
			min = data[i].value;
		if (data[i].value > max)
			max = data[i].value;
	}
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
				saveAsImage : {show: true, title: "Guardar"},

			},
		},
		dataRange: {
			min: min,
			max: max,
			text:['Alto','Bajo'],
			realtime: false,
			calculable : true,
			color: colors
		},
		roamController: {
			show: true,
			x: 'right',
			mapTypeControl: {
			  'HK': true
			}
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
				},
				roam: false
			}
		]
	};
					
	myChart = echarts.init(document.getElementById(element));
	myChart.setOption(option);
	myChart.on(echarts.config.EVENT.CLICK, function (params) {
		console.log(params);
	});
}
function proccessJSON (json) {
	initMap('plot', 'México', 'Inmigración', json, inmigration_data, ['red','yellow','white'], ['Alto', 'Bajo']);
}

function getData () {
	$.getJSON('estados.json',proccessJSON);
}
$(document).on("ready", getData);