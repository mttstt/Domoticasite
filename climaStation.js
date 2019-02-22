// ClimaStation.js
// BASE SETUP
// =============================================================================
// call the packages we need

var os	      = require('os');	
var moment    = require('moment')
var http      = require('http')
var stringify = require('stringify')
var gpio      = require('pi-gpio') //richiede anche l'installazione di quick2wire-gpio-admin con il path del sorgente da modificare
var fs	      = require('fs')
var sensorLib = require('node-dht-sensor')
var str       = require('string')
var jsonfile  = require('jsonfile')
var util      = require('util')  // serve ?
var chokidar  = require('chokidar')
var log4js    = require('log4js');
var fileName  = 'termostato.json'
var express   = require('express')

var app       = express();

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/climaStation.log'), 'climaStation');
var logger    = log4js.getLogger('climaStation');
logger.setLevel('DEBUG'); // INFO, ERROR, DEBUG, WARN

var isteresi  = 0.3 //gradi centigradi
var delay     = 60000 // 1 minuto
var intervalId= ''

moment.locale('it', {months : ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio","agosto", "settembre", "ottobre", "novembre", "dicembre"]});

var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// dht-sensor SETUP
// =============================================================================
// Setup sensor, exit if failed
var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 22;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    logger.fatal('Failed to initialize sensor');
    process.exit(1);
}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.get('/sensori/:idSensor', function(req, res) {
  var ip = jsonfile.readFileSync(fileName,'utf8');
  logger.info('function router.get: '+ip.SensLocat[req.params.idSensor]);

//  askSensor(ip.SensLocat[req.params.idSensor], function(obj) {
//      res.jsonp (obj)	
//  })
});

router.post('/caldaia/', function(req, res) {
        logger.debug('Caldaia: pervenuta interrogazione.');
	var obj = jsonfile.readFileSync(fileName,'utf8');
	logger.debug('Caldaia: dati recuperati dal file');
	if (req.body.Stato_riscaldamento !== "?") {
		switchOnOff(req.body,'Human');
   		res.send(req.body);
	 	logger.debug('Caldaia: richiesta info successiva');
		}
	else {
	  	logger.debug('Caldaia: prima richiesta info');
	    	res.send(obj);
	     };
//	});
});
//=================================================================================

//-----------------------------------------------------------------
// Funzione per leggere temperatuta e umidita' da un sensore.
// La funzione esegue una richiesta HTTP ad un server web implementato 
// su un ESP8266 a cui e' attacato il sensore.
// La funzione legge anche un eventuale sensore posto direttamete sul
// Raspberry (127.0.0.1)
// input:  IP del sensore
// output: temp,umid,ora
        
// La funzione potebbe essere migliorata nella gestione degli errori:
// - mancata lettura
// - lettura pari a zero
// - lettura doppia
//------------------------------------------------------------------
function askSensor(idSensor, callback) {
  if (idSensor != '127.0.0.1') {
	var options = {host: idSensor, port: 80, path: '/sensor' };
	var body = '';
	http.get(options, function(response) {
	   	response.setEncoding('utf8');
    		response.on('data', function(chunk) {body += chunk;});
    		response.on('end', function() { 
			var jsbody = JSON.parse(body);
			var t = jsbody.t 
			var u = jsbody.u
       			var dt = ''
		var dt = moment().format('D MMMM YYYY, HH:mm:ss:SSS');
		logger.info(idSensor+' ('+dt+') - Temperatura:', t + 'C' , 'Umidita:', u + '%');
    		return callback({t: t, u: u, dt: dt});
    		});
  	}).on('error', function(e) {logger.warn('function askSensor: Errore il sensore non risponde: ' + e.message);});
   }	
   if (idSensor == '127.0.0.1') {
	var readout = sensorLib.read();
        var t = readout.temperature.toFixed(1);
        var u = readout.humidity.toFixed(1);
        var dt = '';
	var dt = moment().format('D MMMM YYYY, HH:mm:ss:SSS');
	if (t == '0.0') {logger.warn(idSensor+' ('+dt+') - Temperatura:', t + 'C' , 'Umidita:', u + '%');}
		   else {logger.info(idSensor+' ('+dt+') - Temperatura:', t + 'C' , 'Umidita:', u + '%');}
    	return callback({t: t, u: u, dt: dt});
   }
}


//--------------------------------------------------------
// Funzione per verificare modifiche al file json
// e vedere se ci sono modifiche allo stato del termostato.
// in input riceve l'idSensore rispetto cui verificare la 
// temperatura
//--------------------------------------------------------
function termostato(idsensore) {
   logger.info('Sensore di riferimento del termostato: sala - '+sensLocat["sala"]);

   // l'opzione waitWriteFinish consente di regolare l'evento una volta che il file
   var watcher = chokidar.watch(fileName, {persistent:true, awaitWriteFinish:{stabilityThreshold: 2000,pollInterval: 100}});
   watcher.on('change', function (path,stats) {
      logger.debug('function termostato: rilevato file '+path+' modificato - '+stats.size);
      jsonfile.readFile(fileName,function(err, obj) {
	if (err) logger.error('function termostato : '+err);
	
	logger.debug('function termostato: termostato-'+obj.Stato_termostato+' , riscaldamento-'+obj.Stato_riscaldamento);
  	if (obj.Stato_termostato == 'ON') {
		// se non gia attivato il monitoraggio o periodico della temperatura
    		if (intervalId == '') {
					logger.info('termostato avviato! '+ intervalId );
					intervalId = setInterval(function(){terMon(idsensore,obj)}, delay);
				      }
  	} else {
  	  	logger.info('Termostato spento!')
    		if (intervalId != '') {
				       clearInterval(intervalId);
				       logger.info('termostato spento!');
				       intervalId = '' } 
  	}
      })
   })
          }


//-----------------------------------------------
// Il termostato risulta attivo, allora confronto ogni tot di secondi 
// la temperatura del sensore rispetto alla programmazione del file json
//-----------------------------------------------
function terMon(idsensore, json) {
	logger.debug('Termostato attivo: monitoraggio temperatura');
	var hournow = moment().format('HH');
	var today = moment().format('E');
	var tempLimit = json.week[today-1][hournow+'-'+ ((hournow !="23") ? (parseInt(hournow)+1): "00")]
	askSensor(idsensore, function(obj) { // da gestire: se per qualche motivo il sensore non e' raggiungibile in un lasso di tempo allora in via precauzionale devo spegnere
				      // prevedere il log di mancata lettura.	
		logger.debug('Monitoraggio Termostato -  Temperatura: '+ obj.t2);
		if ((tempLimit - isteresi) >= obj.dt2) {json.Stato_caldaia = "ww"; switchOnOff(json,'termostato')}
		else {json.Stato_caldaia = "OFF"; switchOnOff(json,'termostato')};
  	})
};


// ------------------------------------------------------------------
// Funzione che si occupa di mandare il segnale al relay
// Stato_riscaldamento = ON/OFF
// Stato_termostato = ON/OFF
// Stato_caldaia = ON/OFF
//-------------------------------------------------------------------
function switchOnOff(json,who) {
	logger.debug('function switchOnOff : '+json.Stato_riscaldamento+' , '+json.Stato_caldaia+' , '+who);
	// ||:OR
	var onoff = ((json.Stato_riscaldamento == "ON") || (json.Stato_caldaia == "ON")) ? true : false
	gpio.open(7, "output", function(err) {
		if (err) {logger.error('function switchOnOff : Errore apertura porta GPIO :'+err);};
		logger.debug('function switchOnOff : GPIO open');
  		gpio.write(7, onoff, function(err) {
		    if (err) {logger.error('function switchOnOff : Errore scrittura sulla porta segnale al GPIO :'+err);};
                    gpio.close(7);
		    logger.debug('function switchOnOff : Inviato segnale al relay');
		    jsonfile.writeFile(fileName, json, function(err) {if (err) throw (err)});
	            logger.info('Risc: '+json.Stato_riscaldamento +', Termostato: '+json.Stato_termostato+', Caldaia: '+ json.Stato_caldaia+' - '+ moment().format('HH:mm:ss - D/MM/YYYY')+' - '+who);
		})
	})
}


// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
logger.warn('Magic happens on port ' + port);

// qui si identifica il sensore che deve essere utilizzato dal termostato

var ip = jsonfile.readFileSync(fileName,'utf8');
logger.info('function router.get: '+ip.sensTermostato);
termostato(ip.sensTermostato[ip.sensTermostato]);
