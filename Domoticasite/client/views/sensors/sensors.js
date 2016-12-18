Template.Sensors.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Sensors.events({
	
});

Template.Sensors.helpers({
	
});

/* Copiare il seguente testo in client/views/sensors/

<template name="Tempe2">

	<div class="page-container container" id="content">
		<div class="row" id="title_row">
			<div class="col-md-12">
				<div id="page_menu" class="pull-right">
				</div>
			</div>
		</div>
		<h3>Temperatura ed Umidita'</h3>

	<div class="myContainer"></div>

</div>
</template>

<template name="Tempe3">
	<div id="{{div}}T" class="dynamicDiv"></div>
	<div id="{{div}}U" class="dynamicDiv"></div>
</template>

*/

Template.Sensors.onRendered(function () {

		var e = Sensori.find({ tipo: 'DHT22' }, { sort: { active: -1 }});
		e.forEach( function(s) {
				Blaze.renderWithData(Template.Tempe3,{div: s.location},$('.myContainer')[0]);
			  new Highcharts.Chart(Highcharts.merge(gaugeOptions, optionsT, {chart: { renderTo: s.location+'T' }}));
				new Highcharts.Chart(Highcharts.merge(gaugeOptions, optionsU, {chart: { renderTo: s.location+'U' }}));
		} );

		this.autorun(function () {
				e.forEach( function(s) {
						  if (s.active == true  ) {
										$('#'+s.location+'T').highcharts().chartBackground.attr({fill: '#d3dae2'} );
										$('#'+s.location+'U').highcharts().chartBackground.attr({fill: '#d3dae2'} );
									  $('#'+s.location+'T').highcharts().yAxis[0].setTitle({ text: 'Temperatura '+s.location+" (C)" });
									  $('#'+s.location+'U').highcharts().yAxis[0].setTitle({ text: 'Umidita\' '+s.location+" (%)" });
										$('#'+s.location+'T').highcharts().series[0].points[0].update(s.temp*1);
										$('#'+s.location+'U').highcharts().series[0].points[0].update(s.hum*1);
										$('#'+s.location+'T').highcharts().series[0].name = s.timestamp;
										$('#'+s.location+'U').highcharts().series[0].name = s.timestamp;
										$('#'+s.location+'T').highcharts().series[0].update({dataLabels: {enabled: true } });
										$('#'+s.location+'U').highcharts().series[0].update({dataLabels: {enabled: true } });
							} else {
										$('#'+s.location+'T').highcharts().chartBackground.attr({fill: 'white'} );
										$('#'+s.location+'U').highcharts().chartBackground.attr({fill: 'white'} );
										$('#'+s.location+'T').highcharts().series[0].update({dataLabels: {enabled: false } });
										$('#'+s.location+'U').highcharts().series[0].update({dataLabels: {enabled: false } });
									    $('#'+s.location+'T').highcharts().yAxis[0].setTitle({ text: s.location });
										$('#'+s.location+'U').highcharts().yAxis[0].setTitle({ text: s.location });
										$('#'+s.location+'T').highcharts().series[0].name = 'Sensor not working';
										$('#'+s.location+'U').highcharts().series[0].name = 'Sensor not working';
										$('#'+s.location+'T').highcharts().series[0].points[0].update(0);
										$('#'+s.location+'U').highcharts().series[0].points[0].update(0);
							}										
		      });
			});
});


var gaugeOptions = {
        chart: {
        type: 'solidgauge',
				backgroundColor: '#d3dae2'
        },
        title: null,
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: true
        },
				credits: {
	    		enabled: false
	},
        // the value axis
        yAxis: {
            stops: [
                [0.4, '#DF5353'], // red
                [0.5, '#55BF3B'], // green
                [0.7, '#DF5353']  // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 40,
            tickWidth: 1,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };


var optionsT = {
        yAxis: {
            min: 0,
            max: 40,
            title: {
                text: 'Temperatura'
            }
        },
        series: [{
            name: 'Temperatura',
            data: [0],
						dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:18px;color:' +
                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span> ' +
                         '<span style="font-size:18px;color:silver">C</span></div>'
				}
        }]
};
var optionsU = {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Umidita\''
            }
        },
        series: [{
            name: 'Umidita\'',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:18px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span> ' +
                       '<span style="font-size:18px;color:silver">%</span></div>'
            }
        }]
};
