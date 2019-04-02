
var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};


var socket = io.connect('http://localhost:1234/')
var enviardatos=2;
var enviardatos2=-6;

socket.on('ModuloWiFi',function (data) {
	console.log("[Grafica]  Modulo ESP32  ");
	console.log(data.value2);
	enviardatos=data;
	return enviardatos;
})

socket.on('ModuloWiFi2',function (data) {
	console.log("[Grafica]  Modulo ESP8266 "+data);
	enviardatos2=data;
	return enviardatos2;
})

console.log('[Grafica]  Datos recibidos:  '+enviardatos);


function datosgrafica1() {

	socket.on('ModuloWiFi',function (data) {
		console.log("[Grafica]  Modulo ESP32  ");
		console.log(data.value19);
		enviardatos=data.value18;
		return enviardatos;
	})

	return enviardatos;
}

function datos() {

	socket.emit('iniciar');
	socket.on('datosentrantes',function (data) {
	enviardatos = data;

	return enviardatos;
  });
	//console.log('[Grafica]  Datos desde Server 1 '+enviardatos);
	return enviardatos;
}


function datos2() {

	socket.emit('iniciar2');
	socket.on('datosentrantes2',function (data) {
	enviardatos2 = data;

	return enviardatos2;
  });
	//console.log('[Grafica]  Datos desde Server 2  '+enviardatos2);
	return enviardatos2;
}


function onRefresh(chart) {

	chart.config.data.datasets.forEach(function(dataset) {
		dataset.data.push({
			x: Date.now(),
			y: datosgrafica1()
		});
	});
}

function onRefresh2(chart) {

	chart.config.data.datasets.forEach(function(dataset) {
		dataset.data.push({
			x: Date.now(),
			y: datos2()
		});
	});
}


//Chart.defaults.global.defaultFontColor = 'white'; 	//cambiar el color de fuente

var color = Chart.helpers.color;
var config = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Grafica 1',
			backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
			borderColor: chartColors.blue,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
		}]
	},
	options: {
		title: {
			display: true,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 200,
					delay: 1000,
					onRefresh: onRefresh
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'value'
				}
			}]
		},
		tooltips: {							//etiquetas de puntos
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('grafica1').getContext('2d');
	window.myChart = new Chart(ctx, config);
	var ctx2 = document.getElementById('grafica2').getContext('2d');
	window.myChart = new Chart(ctx2, config2);
};


var color = Chart.helpers.color;
var config2 = {
	type: 'line',
	data: {
		datasets: [{
			label: 'Grafica',
			backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
			borderColor: chartColors.green,
			fill: false,
			cubicInterpolationMode: 'monotone',
			data: []
		}]
	},
	options: {
		title: {
			display: true,
		},
		scales: {
			xAxes: [{
				type: 'realtime',
				realtime: {
					duration: 20000,
					refresh: 200,
					delay: 1000,
					onRefresh: onRefresh2
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'value'
				}
			}]
		},
		tooltips: {							//etiquetas de puntos
			mode: 'nearest',
			intersect: false
		},
		hover: {
			mode: 'nearest',
			intersect: false
		}
	}
};
