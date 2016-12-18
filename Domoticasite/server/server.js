var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	//
	// Setup OAuth login service configuration (read from Meteor.settings)
	//
	// Your settings file should look like this:
	//
	// {
	//     "oauth": {
	//         "google": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         },
	//         "github": {
	//             "clientId": "yourClientId",
	//             "secret": "yourSecret"
	//         }
	//     }
	// }
	//
	if(Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google
		if(Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "google"
			});

			var settingsObject = Meteor.settings.oauth.google;
			settingsObject.service = "google";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// github
		if(Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "github"
			});

			var settingsObject = Meteor.settings.oauth.github;
			settingsObject.service = "github";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// linkedin
		if(Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "linkedin"
			});

			var settingsObject = Meteor.settings.oauth.linkedin;
			settingsObject.service = "linkedin";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// facebook
		if(Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "facebook"
			});

			var settingsObject = Meteor.settings.oauth.facebook;
			settingsObject.service = "facebook";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// twitter
		if(Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "twitter"
			});

			var settingsObject = Meteor.settings.oauth.twitter;
			settingsObject.service = "twitter";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
		// meteor
		if(Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {
			// remove old configuration
			Accounts.loginServiceConfiguration.remove({
				service: "meteor-developer"
			});

			var settingsObject = Meteor.settings.oauth.meteor;
			settingsObject.service = "meteor-developer";

			// add new configuration
			Accounts.loginServiceConfiguration.insert(settingsObject);
		}
	}


if (Sensori.find().count() === 0) {
	var VariantSensoriSchema = {};
	Sensori.attachSchema(VariantSensoriSchema, {ip: {optional: false}, location: {optional: true}, note: {optional: true}, tipo: {optional: true}, temp: {optional: true}, hum: {optional: true}, active:{optional: true} });
  Rangetemp.insert({grado: '15'});Rangetemp.insert({grado: '16'});Rangetemp.insert({grado: '17'});Rangetemp.insert({grado: '18'});Rangetemp.insert({grado: '19'});Rangetemp.insert({grado: '20'});Rangetemp.insert({grado: '21'});Rangetemp.insert({grado: '22'});Rangetemp.insert({grado: '23'});Rangetemp.insert({grado: '24'});Rangetemp.insert({grado: '25'});
  Caldaia.insert({ statocaldaia: false, statoriscaldamento: false, statotermostato: false, sensoretermostato: 'Cameretta', isteresi: '0.5', timescheduler: '60' });
	Sensori.insert({ ip: '127.0.0.1', location: 'Garage', note: '-', tipo: 'DHT22 (on PIN 22)', active: false, timescheduler: 10, on: true});
	Sensori.insert({ ip: '192.168.1.111', location: 'Contatore', note: 'Consumi Enel', tipo: 'pulse', active:false, timescheduler: 20, on: true});
	Sensori.insert({ ip: '192.168.1.112', location: 'Sala', note: '-', tipo: 'DHT22',active: false, timescheduler: 10, on: true });
	Sensori.insert({ ip: '192.168.1.113', location: 'Cameretta', note: '-', tipo: 'DHT22', active: false, timescheduler: 10, on: true});
	Sensori.insert({ ip: '192.168.1.114', location: 'Ingresso', note: '-', tipo: 'DHT22', active: false, timescheduler: 10, on: true});
	Cronotermostato.insert({ day: 'Lunedì',    dayofweek: '1', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Martedì',   dayofweek: '2', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Mercoledì', dayofweek: '3', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Giovedì',   dayofweek: '4', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Venerdì',   dayofweek: '5', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Sabato',    dayofweek: '6', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
	Cronotermostato.insert({ day: 'Domenica',  dayofweek: '7', h001: '18', h012: '18', h023: '18', h034: '18', h045: '18', h056: '18', h067: '18', h078: '18', h089: '18', h0910: '18', h1011: '18', h1112: '18', h1213: '18', h1314: '18', h1415: '18', h1516: '18', h1617: '18', h1718: '18', h1819: '18', h1920: '18', h2021: '18', h2122:'18', h2223:'18', h2324:'18' });
}

// =============================================================================
// SETUP dht-sensor on Raspberry, exit if failed
// =============================================================================
/*
var GpioPin = 22
if (GpioPin !== '') {
    var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
    if (!sensorLib.initialize(sensorType, GpioPin)) {
        console.log('Failed to initialize sensor');
        process.exit(1);
    }
    console.log('Pin GPIO del sensore sul Raspberry: ' + GpioPin);
} else {
    console.log('DHT Sensor non configured on Raspberry');
}
*/

/*
var gpio = require('pi-gpio');
function switchOnOff(onoff) {
    gpio.open(7, "output", function(err) {
        if (err) { console.log('function switchOnOff : Errore apertura porta GPIO :' + err); }
        gpio.write(7, onoff, function(err) {
            if (err) { console.log('function switchOnOff : Errore scrittura sulla porta segnale al GPIO :' + err); }
            gpio.close(7);
						Caldaia.update({}, {$set:{ statocaldaia: onoff}});
						console.log('function switchOnOff : ', onoff );
        });
		});
};
*/

function cron_read_sensor (ip) {
		var sensor = Sensori.findOne({ ip: ip } );
		HTTP.get("http://"+ip+"/json", {}, function( error, response ) {
			if ( error ) { console.log('Error:',ip, error); Sensori.update({ip: ip}, {$set:{ active: false}}); }
			else { if (response.data !== null) {
									if (sensor.tipo == 'DHT22') {
											console.log(ip," (" , response.data.Sensors[0].TaskName,") - T:",response.data.Sensors[0].Temperature ,"- U:", response.data.Sensors[0].Humidity);
											Sensori.update({ip: ip}, {$set:{ hum: response.data.Sensors[0].Humidity, active: true, temp: response.data.Sensors[0].Temperature, location: response.data.Sensors[0].TaskName}});
									}
									if (sensor.tipo =='pulse')	{
										  console.log(ip," (" , response.data.Sensors[0].TaskName,") - Count:", response.data.Sensors[0].Total);
										  Sensori.update({ip: ip}, {$set:{ active: true, location: response.data.Sensors[0].TaskName, note: 'counter:'+response.data.Sensors[0].Total}});
										  //Logpulse.insert({counter: response.data.Sensors[0].Total});
									}
					 } else {console.log(ip," - No data !"); Sensori.update({ip:ip}, {$set:{active: false}}); }
			}
		});
}


function cron_cronotermostato () {
				var today = moment().format('E');
				var hournow = moment().format('HH');
			  var temphour = Cronotermostato.find({ dayofweek: parseInt(today)}).map(function(o){return [o.h001,o.h012,o.h023,o.h034,o.h045,o.h056,o.h067,o.h078,o.h089,o.h0910,o.h1011,o.h1112,o.h1213,o.h1314,o.h1415,o.h1516,o.h1617,o.h1718,o.h1819,o.h1920,o.h2021,o.h2122,o.h2223,o.h2324];})[0][parseInt(hournow)];
				var sensoretermostato = Caldaia.findOne({}).sensoretermostato;
				var isteresi = Caldaia.findOne({}).isteresi;
				var temprilevata = Sensori.findOne({ location: sensoretermostato }).temp;
			  console.log('today:',today,' - hournow:',hournow,' - temphour:',temphour,' - sensoretermostato:', sensoretermostato, ' - isteresi:',isteresi,' - temprilevata:', temprilevata);
				if ((temphour - isteresi) >= temprilevata) {
								Caldaia.update({}, {$set:{ statocaldaia: true}});
							//  switchOnOff(true);
						} else {
								Caldaia.update({}, {$set:{ statocaldaia: false}});
							//  switchOnOff(false);
					}
	}



var termostato =	Caldaia.find({},{fields: {_id: true, statotermostato: true, timescheduler: true}}).observeChanges({
		 changed: function (id, s) {
						if (s.statotermostato == true) {
							//stop
							if (SyncedCron.nextScheduledAtDate('cronotermostato')) { SyncedCron.remove('cronotermostato')};
							//start
							SyncedCron.add({	name: 'cronotermostato',
																schedule: function(parser) {return parser.recur().every(Caldaia.findOne().timescheduler).second()},
																job: cron_cronotermostato});
							Caldaia.update({}, {$set:{ statoriscaldamento: true }});
						} else {if (SyncedCron.nextScheduledAtDate('cronotermostato')) { SyncedCron.remove('cronotermostato')};}
		 },
		 added: function (id, s) {
				  if (s.cronotermostato == true ) {	// switchOnOff(true);
																							Caldaia.update({}, {$set:{ statoriscaldamento: true }}); }
		 }
});


	var riscaldamento = Caldaia.find({},{fields: {statoriscaldamento: true}}).observeChanges({
	   changed: function (id, s) {
			 	// workaround: per qulache motivo non funziona s.on s.ip
				 		if (s.statoriscaldamento == true) {
							//switchOnOff(true);
							Caldaia.update({}, {$set:{ statocaldaia: true }});
						} else { Caldaia.update({}, {$set:{ statocaldaia: false, statotermostato: false }});	}
	   },
		 added: function (id, s) {
			 	 if (s.statoriscaldamento == true ) {	// switchOnOff(true);
					 																		Caldaia.update({}, {$set:{ statocaldaia: true }}); }
	   }
	 });


var on = Sensori.find({},{fields: {ip: true, on: true, timescheduler: true}}).observeChanges({
   changed: function (id, s) {
		      var ip = Sensori.findOne({_id: id}).ip;
			 		if (Sensori.findOne({_id: id}).on == true) {
						 // shutdown
						 if (SyncedCron.nextScheduledAtDate(ip +'_read sensors')) { SyncedCron.remove(ip +'_read sensors')};
						 //activatesensor
						 SyncedCron.add({
			 						name: ip+'_read sensors',
			 						schedule: function(parser) {return parser.recur().every(Sensori.findOne({ ip: ip }).timescheduler).second()},
			 						job: function() {cron_read_sensor(ip); return ip+'_read sensors';}
			 			 });
					} else {if (SyncedCron.nextScheduledAtDate(ip +'_read sensors')) { SyncedCron.remove(ip +'_read sensors')};};
   },
	 added: function (id, s) {
		   var ip = Sensori.findOne({_id: id}).ip;
		 	 if (Sensori.findOne({_id: id}).on == true) {	console.log("Added sensor:", s.ip, s.on, s.timescheduler);
																										SyncedCron.add({
																													name: ip+'_read sensors',
																													schedule: function(parser) {return parser.recur().every(Sensori.findOne({ ip: ip }).timescheduler).second()},
																													job: function() {cron_read_sensor(ip); return ip+'_read sensors';}
																										});
																									 }
   }
 });


function cron_watt () {
	var csvpath = "/var/www/123solar/data/invt1/csv/"
	var csvpath = "C:\\Users\\Sonia\\Documents\\GitHub\\Domoticasite\\"
	var fs = require("fs");
	var today = moment().format("YYYYMMDD");
	var x1 = Math.floor((moment().unix()));
	var csvfs = csvpath+today+".csv"
	//var x1 = Math.floor((moment().unix()/300))*300;
	var ip = Sensori.findOne({tipo: 'pulse'}).ip;
	HTTP.get("http://"+ip+"/json", {}, function( error, response ) {
		if ( error ) { console.log('Error:',ip, error)}
		else { if (response.data !== null)
						{
							var y1 = response.data.Sensors[0].Total;
							console.log('pulsearr update:',x1)
							Watt.update({day: today}, {$push: { pulsearr: {x: x1, y: y1}}},{upsert: true, multi: false});
  			   }
		}
 });

 if (fs.existsSync(csvfs)) { var matrix = (fs.readFileSync(csvfs).toString().split("\n").map(function(row){return { x: moment(today +" "+ row.split(",")[0],"YYYYMMDD HH:mm").unix(), y: Number(row.split(",")[27])};})).slice(1,-1)
			 							 				 if (_.isEqual(matrix, Watt.findOne({day: today}).solararr) != true) {
										 		     console.log('solararr updated');
										 		     Watt.update({day: today}, { $set: {solararr: matrix}},{upsert: true, multi: false});
			 	       						}
										}
 else { console.log('File not found!')}
};


var watt = SyncedCron.add({
  		name: 'watt',
			schedule: function(parser) {return parser.recur().every(5).minute()},
			//schedule: function(parser) {return parser.recur().every(10).second()},
			job: cron_watt
});


SyncedCron.start();

});




Meteor.methods({
	"createUserAccount": function(options) {
		if(!Users.isAdmin(Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}
		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;
		if(options.profile && options.profile.email) userOptions.email = options.profile.email;

		Accounts.createUser(userOptions);
	},
	"updateUserAccount": function(userId, options) {
		// only admin or users own profile
		if(!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {
			throw new Meteor.Error(403, "Access denied.");
		}

		// non-admin user can change only profile
		if(!Users.isAdmin(Meteor.userId())) {
			var keys = Object.keys(options);
			if(keys.length !== 1 || !options.profile) {
				throw new Meteor.Error(403, "Access denied.");
			}
		}

		var userOptions = {};
		if(options.username) userOptions.username = options.username;
		if(options.email) userOptions.email = options.email;
		if(options.password) userOptions.password = options.password;
		if(options.profile) userOptions.profile = options.profile;

		if(options.profile && options.profile.email) userOptions.email = options.profile.email;
		if(options.roles) userOptions.roles = options.roles;

		if(userOptions.email) {
			var email = userOptions.email;
			delete userOptions.email;
			userOptions.emails = [{ address: email }];
		}

		var password = "";
		if(userOptions.password) {
			password = userOptions.password;
			delete userOptions.password;
		}

		if(userOptions) {
			for(var key in userOptions) {
				var obj = userOptions[key];
				if(_.isObject(obj)) {
					for(var k in obj) {
						userOptions[key + "." + k] = obj[k];
					}
					delete userOptions[key];
				}
			}
			Users.update(userId, { $set: userOptions });
		}

		if(password) {
			Accounts.setPassword(userId, password);
		}
	},

	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});

Accounts.onCreateUser(function (options, user) {
	user.roles = ["user"];

	if(options.profile) {
		user.profile = options.profile;
	}


	return user;
});

Accounts.validateLoginAttempt(function(info) {

	// reject users with role "blocked"
	if(info.user && Users.isInRole(info.user._id, "blocked")) {
		throw new Meteor.Error(403, "Your account is blocked.");
	}

  if(verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified ) {
			throw new Meteor.Error(499, "E-mail not verified.");
  }

	return true;
});


Users.before.insert(function(userId, doc) {
	if(doc.emails && doc.emails[0] && doc.emails[0].address) {
		doc.profile = doc.profile || {};
		doc.profile.email = doc.emails[0].address;
	} else {
		// oauth
		if(doc.services) {
			// google e-mail
			if(doc.services.google && doc.services.google.email) {
				doc.profile = doc.profile || {};
				doc.profile.email = doc.services.google.email;
			} else {
				// github e-mail
				if(doc.services.github && doc.services.github.accessToken) {
					var github = new GitHub({
						version: "3.0.0",
						timeout: 5000
					});

					github.authenticate({
						type: "oauth",
						token: doc.services.github.accessToken
					});

					try {
						var result = github.user.getEmails({});
						var email = _.findWhere(result, { primary: true });
						if(!email && result.length && _.isString(result[0])) {
							email = { email: result[0] };
						}

						if(email) {
							doc.profile = doc.profile || {};
							doc.profile.email = email.email;
						}
					} catch(e) {
						console.log(e);
					}
				} else {
					// linkedin email
					if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
						doc.profile = doc.profile || {};
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
						doc.profile.email = doc.services.linkedin.emailAddress;
					} else {
						if(doc.services.facebook && doc.services.facebook.email) {
							doc.profile = doc.profile || {};
							doc.profile.email = doc.services.facebook.email;
						} else {
							if(doc.services.twitter && doc.services.twitter.email) {
								doc.profile = doc.profile || {};
								doc.profile.email = doc.services.twitter.email;
							} else {
								if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;
								}
							}
						}
					}
				}
			}
		}
	}
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
	if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
		modifier.$set.profile.email = modifier.$set.emails[0].address;
	}
});

Accounts.onLogin(function (info) {

});

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl('reset_password/' + token);
};

Accounts.urls.verifyEmail = function (token) {
	return Meteor.absoluteUrl('verify_email/' + token);
};
