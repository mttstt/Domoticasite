Template.Powerconsumption.rendered = function() {
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Powerconsumption.events({
	"changeDate #datepicker": function(event, template) {
    var date = moment(event.date).format("YYYYMMDD");
		console.log('event: ', date);
		var e = Watt.findOne({day: date});
	  new Highcharts.Chart(Options);
		$('#mygraph').highcharts().chartBackground.attr({fill: '#d3dae2'} );
		$('#mygraph').highcharts().setTitle({ text: 'Giorno '+  moment(event.date).format("DD/MM/YYYY") });
		$('#mygraph').highcharts().series[1].setData(solar(date));
		$('#mygraph').highcharts().series[0].setData(pulse(date));
		$('#mygraph').highcharts().series[0].update({dataLabels: {enabled: true } });
  }
});

Template.Powerconsumption.helpers({
});

function pulse (date) {
			var b = []; var x0 = 0; var y0 = 0; var e = Watt.findOne({day: date})
			if (e && e.solararr)  {
						e.pulsearr.forEach(function(s) {
									var x1 = s.x; var y1 = s.y; var deltat = x1-x0;
									if (deltat != 0) {
											 var KwFull = Math.round(((y1 - y0)*3600/deltat),3)
												console.log('pulse',{x: x1*1000, y: KwFull })
												b.push({x: x1*1000, y: KwFull });
												x0 = x1; y0 = y1;
									}
	    			})
			}
			return b;
};

function solar (date) {
			var b = []; var x0 = 0; var y0 = 0; var e = Watt.findOne({day: date})
			if (e && e.solararr)  {
						e.solararr.forEach(function(s) {
										var x1 = s.x; var y1 = s.y; var deltat = x1-x0;
										if (deltat != 0) {
												  var KwFull = Math.round(((y1 - y0)*3600/deltat*1000),3)
													console.log('solar:',{x: x1*1000, y: KwFull })
													b.push({x: x1*1000, y: KwFull });
													x0 = x1; y0 = y1;
										}
				    })
			}
			return b;
};


Template.Powerconsumption.onRendered(function () {
		$('#datepicker').datepicker({
			  todayHighlight: true,
				format: 'dd/mm/yyyy',
				startDate: '29/11/2016',
				endDate: new Date(),
				autoclose: true
		});
    var today = moment().format("YYYYMMDD");
		$('#datepicker').datepicker('setDate', today);
		$('#datepicker').datepicker('update');

	  var e = Watt.findOne({day: today});
	  new Highcharts.Chart(Options);
	  this.autorun(function () {
					$('#mygraph').highcharts().chartBackground.attr({fill: '#d3dae2'} );
					$('#mygraph').highcharts().setTitle({ text: 'Giorno '+ moment().format("DD/MM/YYYY") });
					$('#mygraph').highcharts().series[1].setData(solar(today));
					$('#mygraph').highcharts().series[0].setData(pulse(today));
					$('#mygraph').highcharts().series[0].update({dataLabels: {enabled: true } });
		});

});

var Options = {
             chart: {
			             renderTo: 'mygraph',
						 		   type: 'area',
								   animation: Highcharts.svg,
								   backgroundColor: '#d3dae2',
						 		   zoomType: 'x'
              },
              title: { text: 'Consumi Energia Elettrica', x: -20 },
		    			credits: { enabled: false },
              subtitle: { text: 'Source: matteosetti.noip.me', x: -20 },
              xAxis: {
                        title: { text: 'Ora' },
                        type: 'datetime',
												labels: { /*dateTimeLabelFormats: { hour: "%H:%M"}*/ }
              },
              yAxis: {
                        title: { text: 'Potenza (Watth)' },
												gridLineColor: '#ababa4',
												labels: { formatter: function() { return this.value + ' Watt'; } },
                        plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#e7f410'
                            }]
              },
		    			tooltip: {
                      valueSuffix: ' Watt',
											valueDecimals: 2
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
						color: '#4CEE0B',
						plotOptions: {
		                area: {
                		    fillColor: {
                        		linearGradient: {
                            			x1: 0,
                            			y1: 0,
                            			x2: 0,
                            			y2: 1
                        		},
                        		stops: [
                            			[0, Highcharts.getOptions().colors[2]],
                            			[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        			]
                    		    },
                    		marker: {
                        		radius: 2
                    		},
                    		lineWidth: 4,
                    		states: {
                        		hover: {
                            			lineWidth: 1
                        			}
                    			},
                    			threshold: null
                		}
            		},
		      },
			{
                        color: '#ee190e',
			plotOptions: {
                		area: {
                    			fillColor: {
                        		linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[6]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
			}]
};
