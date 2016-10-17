Template.Tempe.rendered = function() {
	
};

Template.Tempe.events({
	
});

Template.Tempe.helpers({
	
});

/*
 * Function to draw the gauge
 */

var urlc = "http://192.168.1.130:8081/Domotica/caldaia/";
var urls = "http://192.168.1.130:8081/Domotica/sensori/";
var jsonData;
function readStatus (readData) {
  $.ajax({
    url: urlc,
    type: "POST",
    data: JSON.stringify(readData),
    contentType: "application/json; charset=UTF-8",     // formato DATI inviati
    dataType: "json",                                   // formato dati ricevuti
    success: function(data){
 	jsonData = data;
	goChart();
	chartFunction();
    },
    failure: function(errMsg) {alert(errMsg);}
  });
}
   
    
    
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
            tickWidth: 0,
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
            data: [15],
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
            data: [50],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:18px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span> ' +
                       '<span style="font-size:18px;color:silver">%</span></div>'
            }
        }]
};
function create_div_dynamic(i){
      dv = document.createElement('div'); // create dynamically div tag
      dv.setAttribute('id',i);       //give id to it
      dv.className ="dynamicDiv";                // set the style classname
      //set the inner styling of the div tag
      dv.style.margin = "0px auto";
      container.appendChild(dv);
}

function goChart() {
   
   var obj1 = jsonData.sensors;
   for(x in obj1) {
	     create_div_dynamic(obj1[x].location+'T');
	     create_div_dynamic(obj1[x].location+'U');
//             document.getElementById("container").innerHTML += html
	     new Highcharts['Chart'](Highcharts.merge(gaugeOptions, optionsT, {chart: { renderTo: obj1[x].location +'T' }}));
	     new Highcharts['Chart'](Highcharts.merge(gaugeOptions, optionsU, {chart: { renderTo: obj1[x].location +'U' }}));
   }
}



// ..................................................................
// Per ovviare i limiti intradominio del protocollo JSON
// ho configurato il proxypass sul web server apache e modificato
// di conseguenza l'url
//..................................................................
function chartFunction() {
   var obj = jsonData.sensors;
   for(x in obj) {
        $.getJSON(urls+obj[x].location, function(data) {
        })
        .done(function(data) {
		$('#'+data.id+'T').highcharts().series[0].points[0].update(data.t*1);
                $('#'+data.id+'U').highcharts().series[0].points[0].update(data.u*1);
		$('#'+data.id+'T').highcharts().series[0].name = data.dt;
	    $('#'+data.id+'U').highcharts().series[0].name = data.dt;
		$('#'+data.id+'T').highcharts().yAxis[0].setTitle({ text: 'Temperatura '+data.id+" (C)" });
		$('#'+data.id+'U').highcharts().yAxis[0].setTitle({ text: 'Umidita\' '+data.id+" (%)" });
//                document.getElementById(data.id).innerHTML = data.id+'  --  '+data.dt;
                console.log("Sensor: ", data.id, "Temp.: " , data.t, "Umid.: ", data.u," (",data.dt,")");
//              console.log('getJSON request succeeded!');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
                console.log('getJSON request failed! ' + textStatus );
        })
        .always(function() {
//              console.log('getJSON request ended!');
        });
  }
  setTimeout(chartFunction, 10000);
};


/*
 * Call the function to built the chart when the template is rendered
 */
Template.Tempe.rendered = function() {
    readStatus({"Stato_riscaldamento":"?"});
};
