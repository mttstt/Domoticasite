var require = meteorInstall({"lib":{"object_utils.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/object_utils.js                                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                              //
                                                                                                                     //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
/*                                                                                                                   // 1
   Returns property value, where property name is given as path.                                                     // 1
                                                                                                                     // 1
   Example:                                                                                                          // 1
                                                                                                                     // 1
       getPropertyValue("x.y.z", { x: { y: { z: 123 } } }); // returns 123                                           // 1
*/this.getPropertyValue = function (propertyName, obj) {                                                             // 1
	var props = propertyName.split(".");                                                                                // 10
	var res = obj;                                                                                                      // 11
                                                                                                                     // 11
	for (var i = 0; i < props.length; i++) {                                                                            // 12
		res = res[props[i]];                                                                                               // 13
                                                                                                                     // 13
		if (typeof res == "undefined") {                                                                                   // 14
			return res;                                                                                                       // 15
		}                                                                                                                  // 16
	}                                                                                                                   // 17
                                                                                                                     // 17
	return res;                                                                                                         // 18
}; /*                                                                                                                // 19
      converts properties in format { "x.y": "z" } to { x: { y: "z" } }                                              // 22
   */                                                                                                                // 22
                                                                                                                     // 22
this.deepen = function (o) {                                                                                         // 26
	var oo = {},                                                                                                        // 27
	    t,                                                                                                              // 27
	    parts,                                                                                                          // 27
	    part;                                                                                                           // 27
                                                                                                                     // 27
	for (var k in meteorBabelHelpers.sanitizeForInObject(o)) {                                                          // 28
		t = oo;                                                                                                            // 29
		parts = k.split('.');                                                                                              // 30
		var key = parts.pop();                                                                                             // 31
                                                                                                                     // 31
		while (parts.length) {                                                                                             // 32
			part = parts.shift();                                                                                             // 33
			t = t[part] = t[part] || {};                                                                                      // 34
		}                                                                                                                  // 35
                                                                                                                     // 35
		t[key] = o[k];                                                                                                     // 36
	}                                                                                                                   // 37
                                                                                                                     // 37
	return oo;                                                                                                          // 38
}; /*                                                                                                                // 39
   	Function converts array of objects to csv, tsv or json string                                                    // 41
                                                                                                                     // 41
   	exportFields: list of object keys to export (array of strings)                                                   // 41
   	fileType: can be "json", "csv", "tsv" (string)                                                                   // 41
   */                                                                                                                // 41
                                                                                                                     // 41
this.exportArrayOfObjects = function (data, exportFields, fileType) {                                                // 48
	data = data || [];                                                                                                  // 49
	fileType = fileType || "csv";                                                                                       // 50
	exportFields = exportFields || [];                                                                                  // 51
	var str = ""; // export to JSON                                                                                     // 53
                                                                                                                     // 54
	if (fileType == "json") {                                                                                           // 55
		var tmp = [];                                                                                                      // 57
                                                                                                                     // 57
		_.each(data, function (doc) {                                                                                      // 58
			var obj = {};                                                                                                     // 59
                                                                                                                     // 59
			_.each(exportFields, function (field) {                                                                           // 60
				obj[field] = doc[field];                                                                                         // 61
			});                                                                                                               // 62
                                                                                                                     // 60
			tmp.push(obj);                                                                                                    // 63
		});                                                                                                                // 64
                                                                                                                     // 58
		str = JSON.stringify(tmp);                                                                                         // 66
	} // export to CSV or TSV                                                                                           // 67
                                                                                                                     // 69
                                                                                                                     // 69
	if (fileType == "csv" || fileType == "tsv") {                                                                       // 70
		var columnSeparator = "";                                                                                          // 71
                                                                                                                     // 71
		if (fileType == "csv") {                                                                                           // 72
			columnSeparator = ",";                                                                                            // 73
		}                                                                                                                  // 74
                                                                                                                     // 74
		if (fileType == "tsv") {                                                                                           // 75
			// "\t" object literal does not transpile correctly to coffeesctipt                                               // 76
			columnSeparator = String.fromCharCode(9);                                                                         // 77
		}                                                                                                                  // 78
                                                                                                                     // 78
		_.each(exportFields, function (field, i) {                                                                         // 80
			if (i > 0) {                                                                                                      // 81
				str = str + columnSeparator;                                                                                     // 82
			}                                                                                                                 // 83
                                                                                                                     // 83
			str = str + "\"" + field + "\"";                                                                                  // 84
		}); //\r does not transpile correctly to coffeescript                                                              // 85
                                                                                                                     // 86
                                                                                                                     // 86
		str = str + String.fromCharCode(13) + "\n";                                                                        // 87
                                                                                                                     // 87
		_.each(data, function (doc) {                                                                                      // 89
			_.each(exportFields, function (field, i) {                                                                        // 90
				if (i > 0) {                                                                                                     // 91
					str = str + columnSeparator;                                                                                    // 92
				}                                                                                                                // 93
                                                                                                                     // 93
				var value = getPropertyValue(field, doc) + "";                                                                   // 95
				value = value.replace(/"/g, '""');                                                                               // 96
				if (typeof value == "undefined") str = str + "\"\"";else str = str + "\"" + value + "\"";                        // 97
			}); //\r does not transpile correctly to coffeescript                                                             // 101
                                                                                                                     // 102
                                                                                                                     // 102
			str = str + String.fromCharCode(13) + "\n";                                                                       // 103
		});                                                                                                                // 104
	}                                                                                                                   // 105
                                                                                                                     // 105
	return str;                                                                                                         // 107
};                                                                                                                   // 108
                                                                                                                     // 48
this.mergeObjects = function (target, source) {                                                                      // 111
	/* Merges two (or more) objects,                                                                                    // 113
 giving the last one precedence */if ((typeof target === "undefined" ? "undefined" : (0, _typeof3.default)(target)) !== "object") {
		target = {};                                                                                                       // 117
	}                                                                                                                   // 118
                                                                                                                     // 118
	for (var property in meteorBabelHelpers.sanitizeForInObject(source)) {                                              // 120
		if (source.hasOwnProperty(property)) {                                                                             // 122
			var sourceProperty = source[property];                                                                            // 124
                                                                                                                     // 124
			if ((typeof sourceProperty === "undefined" ? "undefined" : (0, _typeof3.default)(sourceProperty)) === 'object') {
				target[property] = mergeObjects(target[property], sourceProperty);                                               // 127
				continue;                                                                                                        // 128
			}                                                                                                                 // 129
                                                                                                                     // 129
			target[property] = sourceProperty;                                                                                // 131
		}                                                                                                                  // 132
	}                                                                                                                   // 133
                                                                                                                     // 133
	for (var a = 2, l = arguments.length; a < l; a++) {                                                                 // 135
		mergeObjects(target, arguments[a]);                                                                                // 136
	}                                                                                                                   // 137
                                                                                                                     // 137
	return target;                                                                                                      // 139
};                                                                                                                   // 140
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"string_utils.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/string_utils.js                                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.escapeRegEx = function (string) {                                                                               // 1
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");                                                       // 2
};                                                                                                                   // 3
                                                                                                                     // 1
this.replaceSubstrings = function (string, find, replace) {                                                          // 5
	return string.replace(new RegExp(escapeRegEx(find), 'g'), replace);                                                 // 6
};                                                                                                                   // 7
                                                                                                                     // 5
this.joinStrings = function (stringArray, join) {                                                                    // 9
	var sep = join || ", ";                                                                                             // 10
	var res = "";                                                                                                       // 11
                                                                                                                     // 11
	_.each(stringArray, function (str) {                                                                                // 12
		if (str) {                                                                                                         // 13
			if (res) res = res + sep;                                                                                         // 14
			res = res + str;                                                                                                  // 16
		}                                                                                                                  // 17
	});                                                                                                                 // 18
                                                                                                                     // 12
	return res;                                                                                                         // 19
};                                                                                                                   // 20
                                                                                                                     // 9
this.convertToSlug = function (text) {                                                                               // 22
	return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -                                  // 23
	.replace(/[^\w\-]+/g, '') // Remove all non-word chars                                                              // 23
	.replace(/\-\-+/g, '-') // Replace multiple - with single -                                                         // 23
	.replace(/^-+/, '') // Trim - from start of text                                                                    // 23
	.replace(/-+$/, ''); // Trim - from end of text                                                                     // 23
};                                                                                                                   // 29
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both":{"collections":{"caldaia.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both/collections/caldaia.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.Caldaia = new Mongo.Collection("caldaia");                                                                      // 1
                                                                                                                     // 1
this.Caldaia.userCanInsert = function (userId, doc) {                                                                // 3
	return true;                                                                                                        // 4
};                                                                                                                   // 5
                                                                                                                     // 3
this.Caldaia.userCanUpdate = function (userId, doc) {                                                                // 7
	return userId && Users.isInRoles(userId, ["admin", "user"]);                                                        // 8
};                                                                                                                   // 9
                                                                                                                     // 7
this.Caldaia.userCanRemove = function (userId, doc) {                                                                // 11
	return true;                                                                                                        // 12
};                                                                                                                   // 13
                                                                                                                     // 11
this.Schemas = this.Schemas || {};                                                                                   // 15
this.Schemas.Caldaia = new SimpleSchema({                                                                            // 17
	statoriscaldamento: {                                                                                               // 18
		label: "Stato Riscaldamento",                                                                                      // 19
		type: Boolean,                                                                                                     // 20
		optional: true                                                                                                     // 21
	},                                                                                                                  // 18
	statotermostato: {                                                                                                  // 23
		label: "Stato del Termostato",                                                                                     // 24
		type: Boolean,                                                                                                     // 25
		optional: true                                                                                                     // 26
	},                                                                                                                  // 23
	statocaldaia: {                                                                                                     // 28
		label: "Stato della Caldaia",                                                                                      // 29
		type: Boolean,                                                                                                     // 30
		optional: true                                                                                                     // 31
	},                                                                                                                  // 28
	sensoretermostato: {                                                                                                // 33
		label: "Sensore utilizzato dal termostato",                                                                        // 34
		type: String,                                                                                                      // 35
		optional: true                                                                                                     // 36
	},                                                                                                                  // 33
	timescheduler: {                                                                                                    // 38
		label: "Intervallo letture",                                                                                       // 39
		type: Number,                                                                                                      // 40
		optional: true,                                                                                                    // 41
		defaultValue: 60                                                                                                   // 42
	},                                                                                                                  // 38
	isteresi: {                                                                                                         // 44
		label: "Isteresi",                                                                                                 // 45
		type: Number,                                                                                                      // 46
		decimal: true,                                                                                                     // 47
		optional: true,                                                                                                    // 48
		defaultValue: 0                                                                                                    // 49
	}                                                                                                                   // 44
});                                                                                                                  // 17
this.Caldaia.attachSchema(this.Schemas.Caldaia);                                                                     // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cronotermostato.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both/collections/cronotermostato.js                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.Cronotermostato = new Mongo.Collection("cronotermostato");                                                      // 1
                                                                                                                     // 1
this.Cronotermostato.userCanInsert = function (userId, doc) {                                                        // 3
	return Users.isInRoles(userId, ["admin", "user"]);                                                                  // 4
};                                                                                                                   // 5
                                                                                                                     // 3
this.Cronotermostato.userCanUpdate = function (userId, doc) {                                                        // 7
	return userId && Users.isInRoles(userId, ["admin", "user"]);                                                        // 8
};                                                                                                                   // 9
                                                                                                                     // 7
this.Cronotermostato.userCanRemove = function (userId, doc) {                                                        // 11
	return true;                                                                                                        // 12
};                                                                                                                   // 13
                                                                                                                     // 11
this.Schemas = this.Schemas || {};                                                                                   // 15
this.Schemas.Cronotermostato = new SimpleSchema({                                                                    // 17
	day: {                                                                                                              // 18
		type: String,                                                                                                      // 19
		optional: true                                                                                                     // 20
	},                                                                                                                  // 18
	h001: {                                                                                                             // 22
		label: "00-01",                                                                                                    // 23
		type: Number,                                                                                                      // 24
		optional: true                                                                                                     // 25
	},                                                                                                                  // 22
	h012: {                                                                                                             // 27
		label: "01-02",                                                                                                    // 28
		type: Number,                                                                                                      // 29
		optional: true                                                                                                     // 30
	},                                                                                                                  // 27
	h023: {                                                                                                             // 32
		label: "02-03",                                                                                                    // 33
		type: Number,                                                                                                      // 34
		optional: true                                                                                                     // 35
	},                                                                                                                  // 32
	h034: {                                                                                                             // 37
		label: "03-04",                                                                                                    // 38
		type: Number,                                                                                                      // 39
		optional: true                                                                                                     // 40
	},                                                                                                                  // 37
	h045: {                                                                                                             // 42
		label: "04-05",                                                                                                    // 43
		type: Number,                                                                                                      // 44
		optional: true                                                                                                     // 45
	},                                                                                                                  // 42
	h056: {                                                                                                             // 47
		label: "05-06",                                                                                                    // 48
		type: Number,                                                                                                      // 49
		optional: true                                                                                                     // 50
	},                                                                                                                  // 47
	h067: {                                                                                                             // 52
		label: "06-07",                                                                                                    // 53
		type: Number,                                                                                                      // 54
		optional: true                                                                                                     // 55
	},                                                                                                                  // 52
	h078: {                                                                                                             // 57
		label: "07-08",                                                                                                    // 58
		type: Number,                                                                                                      // 59
		optional: true                                                                                                     // 60
	},                                                                                                                  // 57
	h089: {                                                                                                             // 62
		label: "08-09",                                                                                                    // 63
		type: Number,                                                                                                      // 64
		optional: true                                                                                                     // 65
	},                                                                                                                  // 62
	h0910: {                                                                                                            // 67
		label: "09-10",                                                                                                    // 68
		type: Number,                                                                                                      // 69
		optional: true                                                                                                     // 70
	},                                                                                                                  // 67
	h1011: {                                                                                                            // 72
		label: "10-11",                                                                                                    // 73
		type: Number,                                                                                                      // 74
		optional: true                                                                                                     // 75
	},                                                                                                                  // 72
	h1112: {                                                                                                            // 77
		label: "11-12",                                                                                                    // 78
		type: Number,                                                                                                      // 79
		optional: true                                                                                                     // 80
	},                                                                                                                  // 77
	h1213: {                                                                                                            // 82
		label: "12-13",                                                                                                    // 83
		type: Number,                                                                                                      // 84
		optional: true                                                                                                     // 85
	},                                                                                                                  // 82
	h1314: {                                                                                                            // 87
		label: "13-14",                                                                                                    // 88
		type: Number,                                                                                                      // 89
		optional: true                                                                                                     // 90
	},                                                                                                                  // 87
	h1415: {                                                                                                            // 92
		label: "14-15",                                                                                                    // 93
		type: Number,                                                                                                      // 94
		optional: true                                                                                                     // 95
	},                                                                                                                  // 92
	h1516: {                                                                                                            // 97
		label: "15-16",                                                                                                    // 98
		type: Number,                                                                                                      // 99
		optional: true                                                                                                     // 100
	},                                                                                                                  // 97
	h1617: {                                                                                                            // 102
		label: "16-17",                                                                                                    // 103
		type: Number,                                                                                                      // 104
		optional: true                                                                                                     // 105
	},                                                                                                                  // 102
	h1718: {                                                                                                            // 107
		label: "17-18",                                                                                                    // 108
		type: Number,                                                                                                      // 109
		optional: true                                                                                                     // 110
	},                                                                                                                  // 107
	h1819: {                                                                                                            // 112
		label: "18-19",                                                                                                    // 113
		type: Number,                                                                                                      // 114
		optional: true                                                                                                     // 115
	},                                                                                                                  // 112
	h1920: {                                                                                                            // 117
		label: "19-20",                                                                                                    // 118
		type: Number,                                                                                                      // 119
		optional: true                                                                                                     // 120
	},                                                                                                                  // 117
	h2021: {                                                                                                            // 122
		label: "20-21",                                                                                                    // 123
		type: Number,                                                                                                      // 124
		optional: true                                                                                                     // 125
	},                                                                                                                  // 122
	h2122: {                                                                                                            // 127
		label: "21-22",                                                                                                    // 128
		type: Number,                                                                                                      // 129
		optional: true                                                                                                     // 130
	},                                                                                                                  // 127
	h2223: {                                                                                                            // 132
		label: "22-23",                                                                                                    // 133
		type: Number,                                                                                                      // 134
		optional: true                                                                                                     // 135
	},                                                                                                                  // 132
	h2324: {                                                                                                            // 137
		label: "23-24",                                                                                                    // 138
		type: Number,                                                                                                      // 139
		optional: true                                                                                                     // 140
	},                                                                                                                  // 137
	dayofweek: {                                                                                                        // 142
		label: "dayofweek",                                                                                                // 143
		type: Number                                                                                                       // 144
	}                                                                                                                   // 142
});                                                                                                                  // 17
this.Cronotermostato.attachSchema(this.Schemas.Cronotermostato);                                                     // 148
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rangetemp.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both/collections/rangetemp.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.Rangetemp = new Mongo.Collection("rangetemp");                                                                  // 1
                                                                                                                     // 1
this.Rangetemp.userCanInsert = function (userId, doc) {                                                              // 3
	return true;                                                                                                        // 4
};                                                                                                                   // 5
                                                                                                                     // 3
this.Rangetemp.userCanUpdate = function (userId, doc) {                                                              // 7
	return true;                                                                                                        // 8
};                                                                                                                   // 9
                                                                                                                     // 7
this.Rangetemp.userCanRemove = function (userId, doc) {                                                              // 11
	return true;                                                                                                        // 12
};                                                                                                                   // 13
                                                                                                                     // 11
this.Schemas = this.Schemas || {};                                                                                   // 15
this.Schemas.Rangetemp = new SimpleSchema({                                                                          // 17
	grado: {                                                                                                            // 18
		label: "grado",                                                                                                    // 19
		type: Number,                                                                                                      // 20
		optional: true                                                                                                     // 21
	}                                                                                                                   // 18
});                                                                                                                  // 17
this.Rangetemp.attachSchema(this.Schemas.Rangetemp);                                                                 // 25
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sensori.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both/collections/sensori.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.Sensori = new Mongo.Collection("sensori");                                                                      // 1
                                                                                                                     // 1
this.Sensori.userCanInsert = function (userId, doc) {                                                                // 3
	return Users.isInRoles(userId, ["admin", "user"]);                                                                  // 4
};                                                                                                                   // 5
                                                                                                                     // 3
this.Sensori.userCanUpdate = function (userId, doc) {                                                                // 7
	return userId && Users.isInRoles(userId, ["admin", "user"]);                                                        // 8
};                                                                                                                   // 9
                                                                                                                     // 7
this.Sensori.userCanRemove = function (userId, doc) {                                                                // 11
	return userId && Users.isInRoles(userId, ["admin"]);                                                                // 12
};                                                                                                                   // 13
                                                                                                                     // 11
this.Schemas = this.Schemas || {};                                                                                   // 15
this.Schemas.Sensori = new SimpleSchema({                                                                            // 17
	ip: {                                                                                                               // 18
		label: "IP",                                                                                                       // 19
		type: String                                                                                                       // 20
	},                                                                                                                  // 18
	location: {                                                                                                         // 22
		label: "Location",                                                                                                 // 23
		type: String,                                                                                                      // 24
		optional: true                                                                                                     // 25
	},                                                                                                                  // 22
	note: {                                                                                                             // 27
		label: "Note",                                                                                                     // 28
		type: String,                                                                                                      // 29
		optional: true                                                                                                     // 30
	},                                                                                                                  // 27
	tipo: {                                                                                                             // 32
		label: "Tipo",                                                                                                     // 33
		type: String,                                                                                                      // 34
		optional: true                                                                                                     // 35
	},                                                                                                                  // 32
	temp: {                                                                                                             // 37
		label: "Temperature",                                                                                              // 38
		type: Number,                                                                                                      // 39
		decimal: true,                                                                                                     // 40
		optional: true                                                                                                     // 41
	},                                                                                                                  // 37
	hum: {                                                                                                              // 43
		label: "Humidity",                                                                                                 // 44
		type: Number,                                                                                                      // 45
		decimal: true,                                                                                                     // 46
		optional: true                                                                                                     // 47
	},                                                                                                                  // 43
	active: {                                                                                                           // 49
		label: "Attivo?",                                                                                                  // 50
		type: Boolean,                                                                                                     // 51
		optional: true                                                                                                     // 52
	},                                                                                                                  // 49
	timescheduler: {                                                                                                    // 54
		label: "Schedulazione lettura dati  (secondi)",                                                                    // 55
		type: Number,                                                                                                      // 56
		optional: true                                                                                                     // 57
	},                                                                                                                  // 54
	on: {                                                                                                               // 59
		label: "Acceso?",                                                                                                  // 60
		type: Boolean,                                                                                                     // 61
		optional: true                                                                                                     // 62
	}                                                                                                                   // 59
});                                                                                                                  // 17
this.Sensori.attachSchema(this.Schemas.Sensori);                                                                     // 66
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"watt.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both/collections/watt.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
this.Watt = new Mongo.Collection("watt");                                                                            // 1
                                                                                                                     // 1
this.Watt.userCanInsert = function (userId, doc) {                                                                   // 3
	return true;                                                                                                        // 4
};                                                                                                                   // 5
                                                                                                                     // 3
this.Watt.userCanUpdate = function (userId, doc) {                                                                   // 7
	return true;                                                                                                        // 8
};                                                                                                                   // 9
                                                                                                                     // 7
this.Watt.userCanRemove = function (userId, doc) {                                                                   // 11
	return true;                                                                                                        // 12
};                                                                                                                   // 13
                                                                                                                     // 11
this.Schemas = this.Schemas || {};                                                                                   // 15
this.Schemas.Watt = new SimpleSchema({                                                                               // 17
	day: {                                                                                                              // 18
		label: "day",                                                                                                      // 19
		type: String,                                                                                                      // 20
		optional: true                                                                                                     // 21
	},                                                                                                                  // 18
	pulsearr: {                                                                                                         // 23
		label: "pulsearr",                                                                                                 // 24
		type: [Object],                                                                                                    // 25
		blackbox: true,                                                                                                    // 26
		optional: true                                                                                                     // 27
	},                                                                                                                  // 23
	solararr: {                                                                                                         // 29
		label: "solararr",                                                                                                 // 30
		type: [Object],                                                                                                    // 31
		blackbox: true,                                                                                                    // 32
		optional: true                                                                                                     // 33
	}                                                                                                                   // 29
});                                                                                                                  // 17
this.Watt.attachSchema(this.Schemas.Watt);                                                                           // 37
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"collections":{"caldaia.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/collections/caldaia.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Caldaia.allow({                                                                                                      // 1
	insert: function (userId, doc) {                                                                                    // 2
		return Caldaia.userCanInsert(userId, doc);                                                                         // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return Caldaia.userCanUpdate(userId, doc);                                                                         // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return Caldaia.userCanRemove(userId, doc);                                                                         // 11
	}                                                                                                                   // 12
});                                                                                                                  // 1
Caldaia.before.insert(function (userId, doc) {                                                                       // 15
	doc.createdAt = new Date();                                                                                         // 16
	doc.createdBy = userId;                                                                                             // 17
	doc.modifiedAt = doc.createdAt;                                                                                     // 18
	doc.modifiedBy = doc.createdBy;                                                                                     // 19
	if (!doc.ownerId) doc.ownerId = userId;                                                                             // 22
});                                                                                                                  // 23
Caldaia.before.update(function (userId, doc, fieldNames, modifier, options) {                                        // 25
	modifier.$set = modifier.$set || {};                                                                                // 26
	modifier.$set.modifiedAt = new Date();                                                                              // 27
	modifier.$set.modifiedBy = userId;                                                                                  // 28
});                                                                                                                  // 31
Caldaia.before.upsert(function (userId, selector, modifier, options) {                                               // 33
	modifier.$set = modifier.$set || {};                                                                                // 34
	modifier.$set.modifiedAt = new Date();                                                                              // 35
	modifier.$set.modifiedBy = userId; /*BEFORE_UPSERT_CODE*/                                                           // 36
});                                                                                                                  // 39
Caldaia.before.remove(function (userId, doc) {});                                                                    // 41
Caldaia.after.insert(function (userId, doc) {});                                                                     // 45
Caldaia.after.update(function (userId, doc, fieldNames, modifier, options) {});                                      // 49
Caldaia.after.remove(function (userId, doc) {});                                                                     // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cronotermostato.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/collections/cronotermostato.js                                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Cronotermostato.allow({                                                                                              // 1
	insert: function (userId, doc) {                                                                                    // 2
		return Cronotermostato.userCanInsert(userId, doc);                                                                 // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return Cronotermostato.userCanUpdate(userId, doc);                                                                 // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return Cronotermostato.userCanRemove(userId, doc);                                                                 // 11
	}                                                                                                                   // 12
});                                                                                                                  // 1
Cronotermostato.before.insert(function (userId, doc) {                                                               // 15
	doc.createdAt = new Date();                                                                                         // 16
	doc.createdBy = userId;                                                                                             // 17
	doc.modifiedAt = doc.createdAt;                                                                                     // 18
	doc.modifiedBy = doc.createdBy;                                                                                     // 19
	if (!doc.ownerId) doc.ownerId = userId;                                                                             // 22
});                                                                                                                  // 23
Cronotermostato.before.update(function (userId, doc, fieldNames, modifier, options) {                                // 25
	modifier.$set = modifier.$set || {};                                                                                // 26
	modifier.$set.modifiedAt = new Date();                                                                              // 27
	modifier.$set.modifiedBy = userId;                                                                                  // 28
});                                                                                                                  // 31
Cronotermostato.before.upsert(function (userId, selector, modifier, options) {                                       // 33
	modifier.$set = modifier.$set || {};                                                                                // 34
	modifier.$set.modifiedAt = new Date();                                                                              // 35
	modifier.$set.modifiedBy = userId; /*BEFORE_UPSERT_CODE*/                                                           // 36
});                                                                                                                  // 39
Cronotermostato.before.remove(function (userId, doc) {});                                                            // 41
Cronotermostato.after.insert(function (userId, doc) {});                                                             // 45
Cronotermostato.after.update(function (userId, doc, fieldNames, modifier, options) {});                              // 49
Cronotermostato.after.remove(function (userId, doc) {});                                                             // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rangetemp.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/collections/rangetemp.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Rangetemp.allow({                                                                                                    // 1
	insert: function (userId, doc) {                                                                                    // 2
		return Rangetemp.userCanInsert(userId, doc);                                                                       // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return Rangetemp.userCanUpdate(userId, doc);                                                                       // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return Rangetemp.userCanRemove(userId, doc);                                                                       // 11
	}                                                                                                                   // 12
});                                                                                                                  // 1
Rangetemp.before.insert(function (userId, doc) {                                                                     // 15
	doc.createdAt = new Date();                                                                                         // 16
	doc.createdBy = userId;                                                                                             // 17
	doc.modifiedAt = doc.createdAt;                                                                                     // 18
	doc.modifiedBy = doc.createdBy;                                                                                     // 19
	if (!doc.createdBy) doc.createdBy = userId;                                                                         // 22
});                                                                                                                  // 23
Rangetemp.before.update(function (userId, doc, fieldNames, modifier, options) {                                      // 25
	modifier.$set = modifier.$set || {};                                                                                // 26
	modifier.$set.modifiedAt = new Date();                                                                              // 27
	modifier.$set.modifiedBy = userId;                                                                                  // 28
});                                                                                                                  // 31
Rangetemp.before.upsert(function (userId, selector, modifier, options) {                                             // 33
	modifier.$set = modifier.$set || {};                                                                                // 34
	modifier.$set.modifiedAt = new Date();                                                                              // 35
	modifier.$set.modifiedBy = userId; /*BEFORE_UPSERT_CODE*/                                                           // 36
});                                                                                                                  // 39
Rangetemp.before.remove(function (userId, doc) {});                                                                  // 41
Rangetemp.after.insert(function (userId, doc) {});                                                                   // 45
Rangetemp.after.update(function (userId, doc, fieldNames, modifier, options) {});                                    // 49
Rangetemp.after.remove(function (userId, doc) {});                                                                   // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sensori.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/collections/sensori.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Sensori.allow({                                                                                                      // 1
	insert: function (userId, doc) {                                                                                    // 2
		return Sensori.userCanInsert(userId, doc);                                                                         // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return Sensori.userCanUpdate(userId, doc);                                                                         // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return Sensori.userCanRemove(userId, doc);                                                                         // 11
	}                                                                                                                   // 12
});                                                                                                                  // 1
Sensori.before.insert(function (userId, doc) {                                                                       // 15
	doc.createdAt = new Date();                                                                                         // 16
	doc.createdBy = userId;                                                                                             // 17
	doc.modifiedAt = doc.createdAt;                                                                                     // 18
	doc.modifiedBy = doc.createdBy;                                                                                     // 19
	if (!doc.createdBy) doc.createdBy = userId;                                                                         // 22
});                                                                                                                  // 23
Sensori.before.update(function (userId, doc, fieldNames, modifier, options) {                                        // 25
	modifier.$set = modifier.$set || {};                                                                                // 26
	modifier.$set.modifiedAt = new Date();                                                                              // 27
	modifier.$set.modifiedBy = userId;                                                                                  // 28
});                                                                                                                  // 31
Sensori.before.upsert(function (userId, selector, modifier, options) {                                               // 33
	modifier.$set = modifier.$set || {};                                                                                // 34
	modifier.$set.modifiedAt = new Date();                                                                              // 35
	modifier.$set.modifiedBy = userId; /*BEFORE_UPSERT_CODE*/                                                           // 36
});                                                                                                                  // 39
Sensori.before.remove(function (userId, doc) {});                                                                    // 41
Sensori.after.insert(function (userId, doc) {});                                                                     // 45
Sensori.after.update(function (userId, doc, fieldNames, modifier, options) {});                                      // 49
Sensori.after.remove(function (userId, doc) {});                                                                     // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"watt.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/collections/watt.js                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Watt.allow({                                                                                                         // 1
	insert: function (userId, doc) {                                                                                    // 2
		return Watt.userCanInsert(userId, doc);                                                                            // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return Watt.userCanUpdate(userId, doc);                                                                            // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return Watt.userCanRemove(userId, doc);                                                                            // 11
	}                                                                                                                   // 12
});                                                                                                                  // 1
Watt.before.insert(function (userId, doc) {                                                                          // 15
	doc.createdAt = new Date();                                                                                         // 16
	doc.createdBy = userId;                                                                                             // 17
	doc.modifiedAt = doc.createdAt;                                                                                     // 18
	doc.modifiedBy = doc.createdBy;                                                                                     // 19
	if (!doc.createdBy) doc.createdBy = userId;                                                                         // 22
});                                                                                                                  // 23
Watt.before.update(function (userId, doc, fieldNames, modifier, options) {                                           // 25
	modifier.$set = modifier.$set || {};                                                                                // 26
	modifier.$set.modifiedAt = new Date();                                                                              // 27
	modifier.$set.modifiedBy = userId;                                                                                  // 28
});                                                                                                                  // 31
Watt.before.upsert(function (userId, selector, modifier, options) {                                                  // 33
	modifier.$set = modifier.$set || {};                                                                                // 34
	modifier.$set.modifiedAt = new Date();                                                                              // 35
	modifier.$set.modifiedBy = userId; /*BEFORE_UPSERT_CODE*/                                                           // 36
});                                                                                                                  // 39
Watt.before.remove(function (userId, doc) {});                                                                       // 41
Watt.after.insert(function (userId, doc) {});                                                                        // 45
Watt.after.update(function (userId, doc, fieldNames, modifier, options) {});                                         // 49
Watt.after.remove(function (userId, doc) {});                                                                        // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"controllers":{"router.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/controllers/router.js                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Router.map(function () {});                                                                                          // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"methods":{"caldaia.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods/caldaia.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	"caldaiaInsert": function (data) {                                                                                  // 2
		if (!Caldaia.userCanInsert(this.userId, data)) {                                                                   // 3
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 4
		}                                                                                                                  // 5
                                                                                                                     // 5
		return Caldaia.insert(data);                                                                                       // 7
	},                                                                                                                  // 8
	"caldaiaUpdate": function (id, data) {                                                                              // 10
		var doc = Caldaia.findOne({                                                                                        // 11
			_id: id                                                                                                           // 11
		});                                                                                                                // 11
                                                                                                                     // 11
		if (!Caldaia.userCanUpdate(this.userId, doc)) {                                                                    // 12
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 13
		}                                                                                                                  // 14
                                                                                                                     // 14
		Caldaia.update({                                                                                                   // 16
			_id: id                                                                                                           // 16
		}, {                                                                                                               // 16
			$set: data                                                                                                        // 16
		});                                                                                                                // 16
	},                                                                                                                  // 17
	"caldaiaRemove": function (id) {                                                                                    // 19
		var doc = Caldaia.findOne({                                                                                        // 20
			_id: id                                                                                                           // 20
		});                                                                                                                // 20
                                                                                                                     // 20
		if (!Caldaia.userCanRemove(this.userId, doc)) {                                                                    // 21
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 22
		}                                                                                                                  // 23
                                                                                                                     // 23
		Caldaia.remove({                                                                                                   // 25
			_id: id                                                                                                           // 25
		});                                                                                                                // 25
	}                                                                                                                   // 26
});                                                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cronotermostato.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods/cronotermostato.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	"cronotermostatoInsert": function (data) {                                                                          // 2
		if (!Cronotermostato.userCanInsert(this.userId, data)) {                                                           // 3
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 4
		}                                                                                                                  // 5
                                                                                                                     // 5
		return Cronotermostato.insert(data);                                                                               // 7
	},                                                                                                                  // 8
	"cronotermostatoUpdate": function (id, data) {                                                                      // 10
		var doc = Cronotermostato.findOne({                                                                                // 11
			_id: id                                                                                                           // 11
		});                                                                                                                // 11
                                                                                                                     // 11
		if (!Cronotermostato.userCanUpdate(this.userId, doc)) {                                                            // 12
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 13
		}                                                                                                                  // 14
                                                                                                                     // 14
		Cronotermostato.update({                                                                                           // 16
			_id: id                                                                                                           // 16
		}, {                                                                                                               // 16
			$set: data                                                                                                        // 16
		});                                                                                                                // 16
	},                                                                                                                  // 17
	"cronotermostatoRemove": function (id) {                                                                            // 19
		var doc = Cronotermostato.findOne({                                                                                // 20
			_id: id                                                                                                           // 20
		});                                                                                                                // 20
                                                                                                                     // 20
		if (!Cronotermostato.userCanRemove(this.userId, doc)) {                                                            // 21
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 22
		}                                                                                                                  // 23
                                                                                                                     // 23
		Cronotermostato.remove({                                                                                           // 25
			_id: id                                                                                                           // 25
		});                                                                                                                // 25
	}                                                                                                                   // 26
});                                                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rangetemp.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods/rangetemp.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	"rangetempInsert": function (data) {                                                                                // 2
		if (!Rangetemp.userCanInsert(this.userId, data)) {                                                                 // 3
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 4
		}                                                                                                                  // 5
                                                                                                                     // 5
		return Rangetemp.insert(data);                                                                                     // 7
	},                                                                                                                  // 8
	"rangetempUpdate": function (id, data) {                                                                            // 10
		var doc = Rangetemp.findOne({                                                                                      // 11
			_id: id                                                                                                           // 11
		});                                                                                                                // 11
                                                                                                                     // 11
		if (!Rangetemp.userCanUpdate(this.userId, doc)) {                                                                  // 12
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 13
		}                                                                                                                  // 14
                                                                                                                     // 14
		Rangetemp.update({                                                                                                 // 16
			_id: id                                                                                                           // 16
		}, {                                                                                                               // 16
			$set: data                                                                                                        // 16
		});                                                                                                                // 16
	},                                                                                                                  // 17
	"rangetempRemove": function (id) {                                                                                  // 19
		var doc = Rangetemp.findOne({                                                                                      // 20
			_id: id                                                                                                           // 20
		});                                                                                                                // 20
                                                                                                                     // 20
		if (!Rangetemp.userCanRemove(this.userId, doc)) {                                                                  // 21
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 22
		}                                                                                                                  // 23
                                                                                                                     // 23
		Rangetemp.remove({                                                                                                 // 25
			_id: id                                                                                                           // 25
		});                                                                                                                // 25
	}                                                                                                                   // 26
});                                                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sensori.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods/sensori.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	"sensoriInsert": function (data) {                                                                                  // 2
		if (!Sensori.userCanInsert(this.userId, data)) {                                                                   // 3
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 4
		}                                                                                                                  // 5
                                                                                                                     // 5
		return Sensori.insert(data);                                                                                       // 7
	},                                                                                                                  // 8
	"sensoriUpdate": function (id, data) {                                                                              // 10
		var doc = Sensori.findOne({                                                                                        // 11
			_id: id                                                                                                           // 11
		});                                                                                                                // 11
                                                                                                                     // 11
		if (!Sensori.userCanUpdate(this.userId, doc)) {                                                                    // 12
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 13
		}                                                                                                                  // 14
                                                                                                                     // 14
		Sensori.update({                                                                                                   // 16
			_id: id                                                                                                           // 16
		}, {                                                                                                               // 16
			$set: data                                                                                                        // 16
		});                                                                                                                // 16
	},                                                                                                                  // 17
	"sensoriRemove": function (id) {                                                                                    // 19
		var doc = Sensori.findOne({                                                                                        // 20
			_id: id                                                                                                           // 20
		});                                                                                                                // 20
                                                                                                                     // 20
		if (!Sensori.userCanRemove(this.userId, doc)) {                                                                    // 21
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 22
		}                                                                                                                  // 23
                                                                                                                     // 23
		Sensori.remove({                                                                                                   // 25
			_id: id                                                                                                           // 25
		});                                                                                                                // 25
	}                                                                                                                   // 26
});                                                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"watt.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/methods/watt.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.methods({                                                                                                     // 1
	"wattInsert": function (data) {                                                                                     // 2
		if (!Watt.userCanInsert(this.userId, data)) {                                                                      // 3
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 4
		}                                                                                                                  // 5
                                                                                                                     // 5
		return Watt.insert(data);                                                                                          // 7
	},                                                                                                                  // 8
	"wattUpdate": function (id, data) {                                                                                 // 10
		var doc = Watt.findOne({                                                                                           // 11
			_id: id                                                                                                           // 11
		});                                                                                                                // 11
                                                                                                                     // 11
		if (!Watt.userCanUpdate(this.userId, doc)) {                                                                       // 12
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 13
		}                                                                                                                  // 14
                                                                                                                     // 14
		Watt.update({                                                                                                      // 16
			_id: id                                                                                                           // 16
		}, {                                                                                                               // 16
			$set: data                                                                                                        // 16
		});                                                                                                                // 16
	},                                                                                                                  // 17
	"wattRemove": function (id) {                                                                                       // 19
		var doc = Watt.findOne({                                                                                           // 20
			_id: id                                                                                                           // 20
		});                                                                                                                // 20
                                                                                                                     // 20
		if (!Watt.userCanRemove(this.userId, doc)) {                                                                       // 21
			throw new Meteor.Error(403, "Forbidden.");                                                                        // 22
		}                                                                                                                  // 23
                                                                                                                     // 23
		Watt.remove({                                                                                                      // 25
			_id: id                                                                                                           // 25
		});                                                                                                                // 25
	}                                                                                                                   // 26
});                                                                                                                  // 1
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"publish":{"caldaia.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publish/caldaia.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("caldaia_dettaglio", function (caldaiaId) {                                                           // 1
	if (Users.isInRoles(this.userId, ["admin", "user"])) {                                                              // 2
		return Caldaia.find({                                                                                              // 3
			_id: caldaiaId                                                                                                    // 3
		}, {});                                                                                                            // 3
	}                                                                                                                   // 4
                                                                                                                     // 4
	return this.ready();                                                                                                // 5
});                                                                                                                  // 6
Meteor.publish("caldaia_lista", function () {                                                                        // 8
	if (Users.isInRoles(this.userId, ["admin", "user"])) {                                                              // 9
		return Caldaia.find({}, {});                                                                                       // 10
	}                                                                                                                   // 11
                                                                                                                     // 11
	return this.ready();                                                                                                // 12
});                                                                                                                  // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"cronotermostato.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publish/cronotermostato.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("cronotermostato_lista", function () {                                                                // 1
	if (Users.isInRoles(this.userId, ["admin", "user"])) {                                                              // 2
		return Cronotermostato.find({}, {                                                                                  // 3
			sort: {                                                                                                           // 3
				dayofweek: 1                                                                                                     // 3
			}                                                                                                                 // 3
		});                                                                                                                // 3
	}                                                                                                                   // 4
                                                                                                                     // 4
	return this.ready();                                                                                                // 5
});                                                                                                                  // 6
Meteor.publish("cronotermostato_dettaglio", function (cronotermostatoId) {                                           // 8
	if (Users.isInRoles(this.userId, ["admin", "user"])) {                                                              // 9
		return Cronotermostato.find({                                                                                      // 10
			_id: cronotermostatoId                                                                                            // 10
		}, {});                                                                                                            // 10
	}                                                                                                                   // 11
                                                                                                                     // 11
	return this.ready();                                                                                                // 12
});                                                                                                                  // 13
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rangetemp.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publish/rangetemp.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("rangetemp_lista", function () {                                                                      // 1
	return Rangetemp.find({}, {});                                                                                      // 2
});                                                                                                                  // 3
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"sensori.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publish/sensori.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("sensori_lista", function () {                                                                        // 1
	return Sensori.find({}, {});                                                                                        // 2
});                                                                                                                  // 3
Meteor.publish("sensore_dettaglio", function (sensoreId) {                                                           // 5
	return Sensori.find({                                                                                               // 6
		_id: sensoreId                                                                                                     // 6
	}, {});                                                                                                             // 6
});                                                                                                                  // 7
Meteor.publish("sensori_vuoto", function () {                                                                        // 9
	return Sensori.find({                                                                                               // 10
		ip: null                                                                                                           // 10
	}, {});                                                                                                             // 10
});                                                                                                                  // 11
Meteor.publish("sensori_temp_lista", function () {                                                                   // 13
	return Sensori.find({                                                                                               // 14
		tipo: "DHT22"                                                                                                      // 14
	}, {});                                                                                                             // 14
});                                                                                                                  // 15
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"watt.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/publish/watt.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Meteor.publish("watt_id", function (dayId) {                                                                         // 1
	return Watt.find({                                                                                                  // 2
		day: dayId                                                                                                         // 2
	}, {});                                                                                                             // 2
});                                                                                                                  // 3
Meteor.publish("watt_list", function () {                                                                            // 5
	return Watt.find({}, {});                                                                                           // 6
});                                                                                                                  // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/server.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                              //
                                                                                                                     //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                     //
                                                                                                                     //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                    //
                                                                                                                     //
var verifyEmail = true;                                                                                              // 1
Accounts.config({                                                                                                    // 3
	sendVerificationEmail: verifyEmail                                                                                  // 3
});                                                                                                                  // 3
Meteor.startup(function () {                                                                                         // 5
	// read environment variables from Meteor.settings                                                                  // 6
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {                                    // 7
		for (var variableName in meteorBabelHelpers.sanitizeForInObject(Meteor.settings.env)) {                            // 8
			process.env[variableName] = Meteor.settings.env[variableName];                                                    // 9
		}                                                                                                                  // 10
	} //                                                                                                                // 11
	// Setup OAuth login service configuration (read from Meteor.settings)                                              // 14
	//                                                                                                                  // 15
	// Your settings file should look like this:                                                                        // 16
	//                                                                                                                  // 17
	// {                                                                                                                // 18
	//     "oauth": {                                                                                                   // 19
	//         "google": {                                                                                              // 20
	//             "clientId": "yourClientId",                                                                          // 21
	//             "secret": "yourSecret"                                                                               // 22
	//         },                                                                                                       // 23
	//         "github": {                                                                                              // 24
	//             "clientId": "yourClientId",                                                                          // 25
	//             "secret": "yourSecret"                                                                               // 26
	//         }                                                                                                        // 27
	//     }                                                                                                            // 28
	// }                                                                                                                // 29
	//                                                                                                                  // 30
                                                                                                                     // 30
                                                                                                                     // 30
	if (Accounts && Accounts.loginServiceConfiguration && Meteor.settings && Meteor.settings.oauth && _.isObject(Meteor.settings.oauth)) {
		// google                                                                                                          // 32
		if (Meteor.settings.oauth.google && _.isObject(Meteor.settings.oauth.google)) {                                    // 33
			// remove old configuration                                                                                       // 34
			Accounts.loginServiceConfiguration.remove({                                                                       // 35
				service: "google"                                                                                                // 36
			});                                                                                                               // 35
			var settingsObject = Meteor.settings.oauth.google;                                                                // 39
			settingsObject.service = "google"; // add new configuration                                                       // 40
                                                                                                                     // 42
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 43
		} // github                                                                                                        // 44
                                                                                                                     // 45
                                                                                                                     // 45
		if (Meteor.settings.oauth.github && _.isObject(Meteor.settings.oauth.github)) {                                    // 46
			// remove old configuration                                                                                       // 47
			Accounts.loginServiceConfiguration.remove({                                                                       // 48
				service: "github"                                                                                                // 49
			});                                                                                                               // 48
			var settingsObject = Meteor.settings.oauth.github;                                                                // 52
			settingsObject.service = "github"; // add new configuration                                                       // 53
                                                                                                                     // 55
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 56
		} // linkedin                                                                                                      // 57
                                                                                                                     // 58
                                                                                                                     // 58
		if (Meteor.settings.oauth.linkedin && _.isObject(Meteor.settings.oauth.linkedin)) {                                // 59
			// remove old configuration                                                                                       // 60
			Accounts.loginServiceConfiguration.remove({                                                                       // 61
				service: "linkedin"                                                                                              // 62
			});                                                                                                               // 61
			var settingsObject = Meteor.settings.oauth.linkedin;                                                              // 65
			settingsObject.service = "linkedin"; // add new configuration                                                     // 66
                                                                                                                     // 68
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 69
		} // facebook                                                                                                      // 70
                                                                                                                     // 71
                                                                                                                     // 71
		if (Meteor.settings.oauth.facebook && _.isObject(Meteor.settings.oauth.facebook)) {                                // 72
			// remove old configuration                                                                                       // 73
			Accounts.loginServiceConfiguration.remove({                                                                       // 74
				service: "facebook"                                                                                              // 75
			});                                                                                                               // 74
			var settingsObject = Meteor.settings.oauth.facebook;                                                              // 78
			settingsObject.service = "facebook"; // add new configuration                                                     // 79
                                                                                                                     // 81
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 82
		} // twitter                                                                                                       // 83
                                                                                                                     // 84
                                                                                                                     // 84
		if (Meteor.settings.oauth.twitter && _.isObject(Meteor.settings.oauth.twitter)) {                                  // 85
			// remove old configuration                                                                                       // 86
			Accounts.loginServiceConfiguration.remove({                                                                       // 87
				service: "twitter"                                                                                               // 88
			});                                                                                                               // 87
			var settingsObject = Meteor.settings.oauth.twitter;                                                               // 91
			settingsObject.service = "twitter"; // add new configuration                                                      // 92
                                                                                                                     // 94
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 95
		} // meteor                                                                                                        // 96
                                                                                                                     // 97
                                                                                                                     // 97
		if (Meteor.settings.oauth.meteor && _.isObject(Meteor.settings.oauth.meteor)) {                                    // 98
			// remove old configuration                                                                                       // 99
			Accounts.loginServiceConfiguration.remove({                                                                       // 100
				service: "meteor-developer"                                                                                      // 101
			});                                                                                                               // 100
			var settingsObject = Meteor.settings.oauth.meteor;                                                                // 104
			settingsObject.service = "meteor-developer"; // add new configuration                                             // 105
                                                                                                                     // 107
			Accounts.loginServiceConfiguration.insert(settingsObject);                                                        // 108
		}                                                                                                                  // 109
	}                                                                                                                   // 110
                                                                                                                     // 110
	var csvpath = "/var/www/123solar/data/invt1/csv/";                                                                  // 113
	var csvpathwin = "C://Users//matteo//Documents//GitHub//Domoticasite//files//20170318.csv";                         // 114
                                                                                                                     // 114
	var fs = require("fs");                                                                                             // 115
                                                                                                                     // 115
	console.log('System:', process.env.OS); //                                                                          // 117
	// funzione TODO: feature per cercare nuovi sensori in rete e comunicarne l'esistenza all'amministratore per la loro  inclusione.
	//                                                                                                                  // 121
                                                                                                                     // 121
	function find_sensor() {                                                                                            // 122
		var base = "192.168.1.";                                                                                           // 123
		var i = 1;                                                                                                         // 124
                                                                                                                     // 124
		for (i = 1; index < 254; ++index) {                                                                                // 125
			var ip = base + i;                                                                                                // 126
			var oldip = Sensori.find({}).ip.map(function (row) {                                                              // 127
				return row;                                                                                                      // 127
			});                                                                                                               // 127
                                                                                                                     // 127
			try {                                                                                                             // 129
				response = HTTP.get("http://" + ip + "/json", {});                                                               // 129
                                                                                                                     // 129
				if (response.data.Sensors[0].TaskName !== null) {                                                                // 130
					Sensori.insert({                                                                                                // 131
						ip: ip,                                                                                                        // 131
						location: response.data.Sensors[0].TaskName,                                                                   // 131
						note: '-',                                                                                                     // 131
						tipo: '',                                                                                                      // 131
						active: true,                                                                                                  // 131
						timescheduler: 30,                                                                                             // 131
						on: true                                                                                                       // 131
					});                                                                                                             // 131
				}                                                                                                                // 132
			} catch (e) {                                                                                                     // 133
				console.log('no found', ip, ' -', e);                                                                            // 134
			}                                                                                                                 // 134
		}                                                                                                                  // 135
	}                                                                                                                   // 136
                                                                                                                     // 136
	if (Sensori.find().count() === 0) {                                                                                 // 139
		var VariantSensoriSchema = {}; //Edit.insert({text: 'o'});                                                         // 140
                                                                                                                     // 141
		Sensori.attachSchema(VariantSensoriSchema, {                                                                       // 142
			ip: {                                                                                                             // 142
				optional: false                                                                                                  // 142
			},                                                                                                                // 142
			location: {                                                                                                       // 142
				optional: true                                                                                                   // 142
			},                                                                                                                // 142
			note: {                                                                                                           // 142
				optional: true                                                                                                   // 142
			},                                                                                                                // 142
			tipo: {                                                                                                           // 142
				optional: true                                                                                                   // 142
			},                                                                                                                // 142
			temp: {                                                                                                           // 142
				optional: true                                                                                                   // 142
			},                                                                                                                // 142
			hum: {                                                                                                            // 142
				optional: true                                                                                                   // 142
			},                                                                                                                // 142
			active: {                                                                                                         // 142
				optional: true                                                                                                   // 142
			}                                                                                                                 // 142
		});                                                                                                                // 142
		Rangetemp.insert({                                                                                                 // 143
			grado: '15'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '16'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '17'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '18'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '19'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '20'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '21'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '22'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '23'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '24'                                                                                                       // 143
		});                                                                                                                // 143
		Rangetemp.insert({                                                                                                 // 143
			grado: '25'                                                                                                       // 143
		});                                                                                                                // 143
		Caldaia.insert({                                                                                                   // 144
			statocaldaia: false,                                                                                              // 144
			statoriscaldamento: false,                                                                                        // 144
			statotermostato: false,                                                                                           // 144
			sensoretermostato: 'Cameretta',                                                                                   // 144
			isteresi: '0.5',                                                                                                  // 144
			timescheduler: '60'                                                                                               // 144
		});                                                                                                                // 144
		Sensori.insert({                                                                                                   // 145
			ip: '127.0.0.1',                                                                                                  // 145
			location: 'Garage',                                                                                               // 145
			note: '-',                                                                                                        // 145
			tipo: 'DHT22 (on PIN 22)',                                                                                        // 145
			active: false,                                                                                                    // 145
			timescheduler: 30,                                                                                                // 145
			on: true                                                                                                          // 145
		});                                                                                                                // 145
		Sensori.insert({                                                                                                   // 146
			ip: '192.168.1.111',                                                                                              // 146
			location: 'Contatore',                                                                                            // 146
			note: 'Consumi Enel',                                                                                             // 146
			tipo: 'pulse',                                                                                                    // 146
			active: false,                                                                                                    // 146
			timescheduler: 30,                                                                                                // 146
			on: true                                                                                                          // 146
		});                                                                                                                // 146
		Sensori.insert({                                                                                                   // 147
			ip: '192.168.1.112',                                                                                              // 147
			location: 'Sala',                                                                                                 // 147
			note: '-',                                                                                                        // 147
			tipo: 'DHT22',                                                                                                    // 147
			active: false,                                                                                                    // 147
			timescheduler: 30,                                                                                                // 147
			on: true                                                                                                          // 147
		});                                                                                                                // 147
		Sensori.insert({                                                                                                   // 148
			ip: '192.168.1.113',                                                                                              // 148
			location: 'Cameretta',                                                                                            // 148
			note: '-',                                                                                                        // 148
			tipo: 'DHT22',                                                                                                    // 148
			active: false,                                                                                                    // 148
			timescheduler: 30,                                                                                                // 148
			on: true                                                                                                          // 148
		});                                                                                                                // 148
		Sensori.insert({                                                                                                   // 149
			ip: '192.168.1.114',                                                                                              // 149
			location: 'Ingresso',                                                                                             // 149
			note: '-',                                                                                                        // 149
			tipo: 'DHT22',                                                                                                    // 149
			active: false,                                                                                                    // 149
			timescheduler: 30,                                                                                                // 149
			on: true                                                                                                          // 149
		});                                                                                                                // 149
		Cronotermostato.insert({                                                                                           // 150
			day: 'Lunedì',                                                                                                    // 150
			dayofweek: '1',                                                                                                   // 150
			h001: '18',                                                                                                       // 150
			h012: '18',                                                                                                       // 150
			h023: '18',                                                                                                       // 150
			h034: '18',                                                                                                       // 150
			h045: '18',                                                                                                       // 150
			h056: '18',                                                                                                       // 150
			h067: '18',                                                                                                       // 150
			h078: '18',                                                                                                       // 150
			h089: '18',                                                                                                       // 150
			h0910: '18',                                                                                                      // 150
			h1011: '18',                                                                                                      // 150
			h1112: '18',                                                                                                      // 150
			h1213: '18',                                                                                                      // 150
			h1314: '18',                                                                                                      // 150
			h1415: '18',                                                                                                      // 150
			h1516: '18',                                                                                                      // 150
			h1617: '18',                                                                                                      // 150
			h1718: '18',                                                                                                      // 150
			h1819: '18',                                                                                                      // 150
			h1920: '18',                                                                                                      // 150
			h2021: '18',                                                                                                      // 150
			h2122: '18',                                                                                                      // 150
			h2223: '18',                                                                                                      // 150
			h2324: '18'                                                                                                       // 150
		});                                                                                                                // 150
		Cronotermostato.insert({                                                                                           // 151
			day: 'Martedì',                                                                                                   // 151
			dayofweek: '2',                                                                                                   // 151
			h001: '18',                                                                                                       // 151
			h012: '18',                                                                                                       // 151
			h023: '18',                                                                                                       // 151
			h034: '18',                                                                                                       // 151
			h045: '18',                                                                                                       // 151
			h056: '18',                                                                                                       // 151
			h067: '18',                                                                                                       // 151
			h078: '18',                                                                                                       // 151
			h089: '18',                                                                                                       // 151
			h0910: '18',                                                                                                      // 151
			h1011: '18',                                                                                                      // 151
			h1112: '18',                                                                                                      // 151
			h1213: '18',                                                                                                      // 151
			h1314: '18',                                                                                                      // 151
			h1415: '18',                                                                                                      // 151
			h1516: '18',                                                                                                      // 151
			h1617: '18',                                                                                                      // 151
			h1718: '18',                                                                                                      // 151
			h1819: '18',                                                                                                      // 151
			h1920: '18',                                                                                                      // 151
			h2021: '18',                                                                                                      // 151
			h2122: '18',                                                                                                      // 151
			h2223: '18',                                                                                                      // 151
			h2324: '18'                                                                                                       // 151
		});                                                                                                                // 151
		Cronotermostato.insert({                                                                                           // 152
			day: 'Mercoledì',                                                                                                 // 152
			dayofweek: '3',                                                                                                   // 152
			h001: '18',                                                                                                       // 152
			h012: '18',                                                                                                       // 152
			h023: '18',                                                                                                       // 152
			h034: '18',                                                                                                       // 152
			h045: '18',                                                                                                       // 152
			h056: '18',                                                                                                       // 152
			h067: '18',                                                                                                       // 152
			h078: '18',                                                                                                       // 152
			h089: '18',                                                                                                       // 152
			h0910: '18',                                                                                                      // 152
			h1011: '18',                                                                                                      // 152
			h1112: '18',                                                                                                      // 152
			h1213: '18',                                                                                                      // 152
			h1314: '18',                                                                                                      // 152
			h1415: '18',                                                                                                      // 152
			h1516: '18',                                                                                                      // 152
			h1617: '18',                                                                                                      // 152
			h1718: '18',                                                                                                      // 152
			h1819: '18',                                                                                                      // 152
			h1920: '18',                                                                                                      // 152
			h2021: '18',                                                                                                      // 152
			h2122: '18',                                                                                                      // 152
			h2223: '18',                                                                                                      // 152
			h2324: '18'                                                                                                       // 152
		});                                                                                                                // 152
		Cronotermostato.insert({                                                                                           // 153
			day: 'Giovedì',                                                                                                   // 153
			dayofweek: '4',                                                                                                   // 153
			h001: '18',                                                                                                       // 153
			h012: '18',                                                                                                       // 153
			h023: '18',                                                                                                       // 153
			h034: '18',                                                                                                       // 153
			h045: '18',                                                                                                       // 153
			h056: '18',                                                                                                       // 153
			h067: '18',                                                                                                       // 153
			h078: '18',                                                                                                       // 153
			h089: '18',                                                                                                       // 153
			h0910: '18',                                                                                                      // 153
			h1011: '18',                                                                                                      // 153
			h1112: '18',                                                                                                      // 153
			h1213: '18',                                                                                                      // 153
			h1314: '18',                                                                                                      // 153
			h1415: '18',                                                                                                      // 153
			h1516: '18',                                                                                                      // 153
			h1617: '18',                                                                                                      // 153
			h1718: '18',                                                                                                      // 153
			h1819: '18',                                                                                                      // 153
			h1920: '18',                                                                                                      // 153
			h2021: '18',                                                                                                      // 153
			h2122: '18',                                                                                                      // 153
			h2223: '18',                                                                                                      // 153
			h2324: '18'                                                                                                       // 153
		});                                                                                                                // 153
		Cronotermostato.insert({                                                                                           // 154
			day: 'Venerdì',                                                                                                   // 154
			dayofweek: '5',                                                                                                   // 154
			h001: '18',                                                                                                       // 154
			h012: '18',                                                                                                       // 154
			h023: '18',                                                                                                       // 154
			h034: '18',                                                                                                       // 154
			h045: '18',                                                                                                       // 154
			h056: '18',                                                                                                       // 154
			h067: '18',                                                                                                       // 154
			h078: '18',                                                                                                       // 154
			h089: '18',                                                                                                       // 154
			h0910: '18',                                                                                                      // 154
			h1011: '18',                                                                                                      // 154
			h1112: '18',                                                                                                      // 154
			h1213: '18',                                                                                                      // 154
			h1314: '18',                                                                                                      // 154
			h1415: '18',                                                                                                      // 154
			h1516: '18',                                                                                                      // 154
			h1617: '18',                                                                                                      // 154
			h1718: '18',                                                                                                      // 154
			h1819: '18',                                                                                                      // 154
			h1920: '18',                                                                                                      // 154
			h2021: '18',                                                                                                      // 154
			h2122: '18',                                                                                                      // 154
			h2223: '18',                                                                                                      // 154
			h2324: '18'                                                                                                       // 154
		});                                                                                                                // 154
		Cronotermostato.insert({                                                                                           // 155
			day: 'Sabato',                                                                                                    // 155
			dayofweek: '6',                                                                                                   // 155
			h001: '18',                                                                                                       // 155
			h012: '18',                                                                                                       // 155
			h023: '18',                                                                                                       // 155
			h034: '18',                                                                                                       // 155
			h045: '18',                                                                                                       // 155
			h056: '18',                                                                                                       // 155
			h067: '18',                                                                                                       // 155
			h078: '18',                                                                                                       // 155
			h089: '18',                                                                                                       // 155
			h0910: '18',                                                                                                      // 155
			h1011: '18',                                                                                                      // 155
			h1112: '18',                                                                                                      // 155
			h1213: '18',                                                                                                      // 155
			h1314: '18',                                                                                                      // 155
			h1415: '18',                                                                                                      // 155
			h1516: '18',                                                                                                      // 155
			h1617: '18',                                                                                                      // 155
			h1718: '18',                                                                                                      // 155
			h1819: '18',                                                                                                      // 155
			h1920: '18',                                                                                                      // 155
			h2021: '18',                                                                                                      // 155
			h2122: '18',                                                                                                      // 155
			h2223: '18',                                                                                                      // 155
			h2324: '18'                                                                                                       // 155
		});                                                                                                                // 155
		Cronotermostato.insert({                                                                                           // 156
			day: 'Domenica',                                                                                                  // 156
			dayofweek: '7',                                                                                                   // 156
			h001: '18',                                                                                                       // 156
			h012: '18',                                                                                                       // 156
			h023: '18',                                                                                                       // 156
			h034: '18',                                                                                                       // 156
			h045: '18',                                                                                                       // 156
			h056: '18',                                                                                                       // 156
			h067: '18',                                                                                                       // 156
			h078: '18',                                                                                                       // 156
			h089: '18',                                                                                                       // 156
			h0910: '18',                                                                                                      // 156
			h1011: '18',                                                                                                      // 156
			h1112: '18',                                                                                                      // 156
			h1213: '18',                                                                                                      // 156
			h1314: '18',                                                                                                      // 156
			h1415: '18',                                                                                                      // 156
			h1516: '18',                                                                                                      // 156
			h1617: '18',                                                                                                      // 156
			h1718: '18',                                                                                                      // 156
			h1819: '18',                                                                                                      // 156
			h1920: '18',                                                                                                      // 156
			h2021: '18',                                                                                                      // 156
			h2122: '18',                                                                                                      // 156
			h2223: '18',                                                                                                      // 156
			h2324: '18'                                                                                                       // 156
		});                                                                                                                // 156
	}                                                                                                                   // 157
                                                                                                                     // 157
	var Raspberry = process.env.WIRINGPI_GPIOMEM == '1' ? true : false;                                                 // 160
                                                                                                                     // 160
	if (Raspberry) {                                                                                                    // 164
		var _wpi = void 0;                                                                                                 // 1
                                                                                                                     // 1
		module.watch(require("wiringpi-node"), {                                                                           // 1
			"default": function (v) {                                                                                         // 1
				_wpi = v;                                                                                                        // 1
			}                                                                                                                 // 1
		}, 0);                                                                                                             // 1
                                                                                                                     // 1
		var _sensorLib = void 0;                                                                                           // 1
                                                                                                                     // 1
		module.watch(require("node-dht-sensor"), {                                                                         // 1
			"default": function (v) {                                                                                         // 1
				_sensorLib = v;                                                                                                  // 1
			}                                                                                                                 // 1
		}, 1);                                                                                                             // 1
                                                                                                                     // 1
		_wpi.setup('sys');                                                                                                 // 166
                                                                                                                     // 166
		var GpioPin = 22;                                                                                                  // 168
                                                                                                                     // 168
		if (GpioPin !== '') {                                                                                              // 169
			var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302                                                     // 170
                                                                                                                     // 170
			if (!_sensorLib.initialize(sensorType, GpioPin)) {                                                                // 171
				console.log('Failed to initialize sensor');                                                                      // 172
				process.exit(1);                                                                                                 // 173
			}                                                                                                                 // 174
                                                                                                                     // 174
			console.log('Pin GPIO del sensore sul Raspberry: ' + GpioPin);                                                    // 175
		} else {                                                                                                           // 176
			console.log('DHT Sensor non configured on Raspberry');                                                            // 177
		}                                                                                                                  // 178
	}                                                                                                                   // 179
                                                                                                                     // 179
	function switchOnOff(onoff) {                                                                                       // 182
		var state = onoff ? 1 : 0;                                                                                         // 183
		console.log('function switchOnOff: ', typeof win === "undefined" ? "undefined" : (0, _typeof3.default)(win), ' - ', state);
                                                                                                                     // 184
		if (Raspberry) {                                                                                                   // 185
			wpi.pinMode(7, wpi.OUTPUT);                                                                                       // 185
			wpi.digitalWrite(7, state);                                                                                       // 185
			console.log('function switchOnOff : Inviato segnale al relay');                                                   // 185
		}                                                                                                                  // 185
	}                                                                                                                   // 186
                                                                                                                     // 186
	function cron_read_sensor(ip) {                                                                                     // 189
		var tipo = Sensori.findOne({                                                                                       // 190
			ip: ip                                                                                                            // 190
		}).tipo;                                                                                                           // 190
                                                                                                                     // 190
		if (tipo == 'DHT22') {                                                                                             // 191
			try {                                                                                                             // 192
				var response = HTTP.get("http://" + ip + "/json", {});                                                           // 193
                                                                                                                     // 193
				if (response.data !== null) {                                                                                    // 194
					//console.log(ip," (" , response.data.Sensors[0].TaskName,") - T:",response.data.Sensors[0].Temperature ,"- U:", response.data.Sensors[0].Humidity);
					Sensori.update({                                                                                                // 196
						ip: ip                                                                                                         // 196
					}, {                                                                                                            // 196
						$set: {                                                                                                        // 196
							hum: response.data.Sensors[0].Humidity,                                                                       // 196
							active: true,                                                                                                 // 196
							temp: response.data.Sensors[0].Temperature,                                                                   // 196
							location: response.data.Sensors[0].TaskName                                                                   // 196
						}                                                                                                              // 196
					});                                                                                                             // 196
				} else {                                                                                                         // 197
					console.log('Warning reading sensor:', ip);                                                                     // 197
					Sensori.update({                                                                                                // 197
						ip: ip                                                                                                         // 197
					}, {                                                                                                            // 197
						$set: {                                                                                                        // 197
							active: false                                                                                                 // 197
						}                                                                                                              // 197
					});                                                                                                             // 197
				}                                                                                                                // 197
			} catch (e) {                                                                                                     // 198
				console.log('Warning reading sensor:', ip);                                                                      // 200
				Sensori.update({                                                                                                 // 201
					ip: ip                                                                                                          // 201
				}, {                                                                                                             // 201
					$set: {                                                                                                         // 201
						active: false                                                                                                  // 201
					}                                                                                                               // 201
				});                                                                                                              // 201
			}                                                                                                                 // 202
		} //	if (tipo == 'pulse')	{                                                                                        // 203
		//		HTTP.get("http://"+ip+"/json", {}, function( error, response ) {                                               // 206
		//				if ( error ) { console.log('Error:',ip, error); Sensori.update({ip: ip}, {$set:{ active: false}}); }         // 207
		//				else { if (response.data !== null) {                                                                         // 208
		//													// console.log(ip," (" , response.data.Sensors[0].TaskName,") - Count:", response.data.Sensors[0].Total);
		//													Sensori.update({ip: ip}, {$set:{ active: true, location: response.data.Sensors[0].TaskName, note: 'counter:'+response.data.Sensors[0].Total}});
		//													}	else {console.log(ip," - No data !"); Sensori.update({ip:ip}, {$set:{active: false}}); }          // 211
		//				}                                                                                                            // 212
		//		});                                                                                                            // 213
		//	}                                                                                                               // 214
                                                                                                                     // 214
                                                                                                                     // 214
		if (Raspberry && tipo == 'DHT22 (on PIN 22)') {                                                                    // 216
			var readout = sensorLib.read();                                                                                   // 217
                                                                                                                     // 217
			if (readout.temperature.toFixed(1) !== '0.0') {                                                                   // 218
				// console.log(ip," (Raspberry) - T:", readout.temperature.toFixed(1),"- U:", readout.humidity.toFixed(1));      // 219
				Sensori.update({                                                                                                 // 220
					ip: ip                                                                                                          // 220
				}, {                                                                                                             // 220
					$set: {                                                                                                         // 220
						hum: readout.humidity.toFixed(1),                                                                              // 220
						active: true,                                                                                                  // 220
						temp: readout.temperature.toFixed(1)                                                                           // 220
					}                                                                                                               // 220
				});                                                                                                              // 220
			}                                                                                                                 // 221
		}                                                                                                                  // 222
	}                                                                                                                   // 223
                                                                                                                     // 223
	function cron_cronotermostato() {                                                                                   // 226
		var today = moment().format('E');                                                                                  // 227
		var hournow = moment().format('HH');                                                                               // 228
		var temphour = Cronotermostato.find({                                                                              // 229
			dayofweek: parseInt(today)                                                                                        // 229
		}).map(function (o) {                                                                                              // 229
			return [o.h001, o.h012, o.h023, o.h034, o.h045, o.h056, o.h067, o.h078, o.h089, o.h0910, o.h1011, o.h1112, o.h1213, o.h1314, o.h1415, o.h1516, o.h1617, o.h1718, o.h1819, o.h1920, o.h2021, o.h2122, o.h2223, o.h2324];
		})[0][parseInt(hournow)];                                                                                          // 229
		var sensoretermostato = Caldaia.findOne({}).sensoretermostato;                                                     // 230
		var isteresi = Caldaia.findOne({}).isteresi;                                                                       // 231
		var temprilevata = Sensori.findOne({                                                                               // 232
			location: sensoretermostato                                                                                       // 232
		}).temp;                                                                                                           // 232
		console.log('today:', today, ' - hournow:', hournow, ' - temphour:', temphour, ' - sensoretermostato:', sensoretermostato, ' - isteresi:', isteresi, ' - temprilevata:', temprilevata);
                                                                                                                     // 233
		if (temphour - isteresi >= temprilevata) {                                                                         // 234
			Caldaia.update({}, {                                                                                              // 235
				$set: {                                                                                                          // 235
					statocaldaia: true                                                                                              // 235
				}                                                                                                                // 235
			});                                                                                                               // 235
			switchOnOff(true);                                                                                                // 236
		} else {                                                                                                           // 237
			Caldaia.update({}, {                                                                                              // 238
				$set: {                                                                                                          // 238
					statocaldaia: false                                                                                             // 238
				}                                                                                                                // 238
			});                                                                                                               // 238
			switchOnOff(false);                                                                                               // 239
		}                                                                                                                  // 240
	}                                                                                                                   // 241
                                                                                                                     // 241
	var termostato = Caldaia.find({}, {                                                                                 // 245
		fields: {                                                                                                          // 245
			_id: true,                                                                                                        // 245
			statotermostato: true,                                                                                            // 245
			timescheduler: true                                                                                               // 245
		}                                                                                                                  // 245
	}).observeChanges({                                                                                                 // 245
		changed: function (id, s) {                                                                                        // 246
			if (s.statotermostato === true) {                                                                                 // 247
				//stop                                                                                                           // 248
				if (SyncedCron.nextScheduledAtDate('cronotermostato')) {                                                         // 249
					SyncedCron.remove('cronotermostato');                                                                           // 249
				} //start                                                                                                        // 249
                                                                                                                     // 250
                                                                                                                     // 250
				SyncedCron.add({                                                                                                 // 251
					name: 'cronotermostato',                                                                                        // 251
					schedule: function (parser) {                                                                                   // 251
						return parser.recur().every(Caldaia.findOne().timescheduler).second();                                         // 251
					},                                                                                                              // 251
					job: cron_cronotermostato                                                                                       // 251
				});                                                                                                              // 251
				Caldaia.update({}, {                                                                                             // 252
					$set: {                                                                                                         // 252
						statoriscaldamento: true                                                                                       // 252
					}                                                                                                               // 252
				});                                                                                                              // 252
			} else {                                                                                                          // 253
				if (SyncedCron.nextScheduledAtDate('cronotermostato')) {                                                         // 253
					SyncedCron.remove('cronotermostato');                                                                           // 253
				}                                                                                                                // 253
			}                                                                                                                 // 253
		},                                                                                                                 // 254
		added: function (id, s) {                                                                                          // 255
			if (s.cronotermostato === true) {                                                                                 // 255
				switchOnOff(true);                                                                                               // 255
				Caldaia.update({}, {                                                                                             // 255
					$set: {                                                                                                         // 255
						statoriscaldamento: true                                                                                       // 255
					}                                                                                                               // 255
				});                                                                                                              // 255
			}                                                                                                                 // 255
		}                                                                                                                  // 255
	});                                                                                                                 // 245
	var riscaldamento = Caldaia.find({}, {                                                                              // 259
		fields: {                                                                                                          // 259
			statoriscaldamento: true                                                                                          // 259
		}                                                                                                                  // 259
	}).observeChanges({                                                                                                 // 259
		changed: function (id, s) {                                                                                        // 260
			// workaround: per qulache motivo non funziona s.on s.ip                                                          // 261
			if (s.statoriscaldamento === true) {                                                                              // 262
				switchOnOff(true);                                                                                               // 262
				Caldaia.update({}, {                                                                                             // 262
					$set: {                                                                                                         // 262
						statocaldaia: true                                                                                             // 262
					}                                                                                                               // 262
				});                                                                                                              // 262
			} else {                                                                                                          // 263
				switchOnOff(false);                                                                                              // 263
				Caldaia.update({}, {                                                                                             // 263
					$set: {                                                                                                         // 263
						statocaldaia: false,                                                                                           // 263
						statotermostato: false                                                                                         // 263
					}                                                                                                               // 263
				});                                                                                                              // 263
			}                                                                                                                 // 263
		},                                                                                                                 // 264
		added: function (id, s) {                                                                                          // 265
			if (s.statoriscaldamento === true) {                                                                              // 265
				switchOnOff(true);                                                                                               // 265
				Caldaia.update({}, {                                                                                             // 265
					$set: {                                                                                                         // 265
						statocaldaia: true                                                                                             // 265
					}                                                                                                               // 265
				});                                                                                                              // 265
			}                                                                                                                 // 265
		}                                                                                                                  // 265
	});                                                                                                                 // 259
	var on = Sensori.find({}, {                                                                                         // 269
		fields: {                                                                                                          // 269
			ip: true,                                                                                                         // 269
			on: true,                                                                                                         // 269
			timescheduler: true                                                                                               // 269
		}                                                                                                                  // 269
	}).observeChanges({                                                                                                 // 269
		changed: function (id, s) {                                                                                        // 270
			var ip = Sensori.findOne({                                                                                        // 271
				_id: id                                                                                                          // 271
			}).ip;                                                                                                            // 271
                                                                                                                     // 271
			if (Sensori.findOne({                                                                                             // 272
				_id: id                                                                                                          // 272
			}).on === true) {                                                                                                 // 272
				// shutdown                                                                                                      // 273
				if (SyncedCron.nextScheduledAtDate(ip + '_read sensors')) {                                                      // 274
					SyncedCron.remove(ip + '_read sensors');                                                                        // 274
				} //activatesensor                                                                                               // 274
                                                                                                                     // 275
                                                                                                                     // 275
				SyncedCron.add({                                                                                                 // 276
					name: ip + '_read sensors',                                                                                     // 277
					schedule: function (parser) {                                                                                   // 278
						return parser.recur().every(Sensori.findOne({                                                                  // 278
							ip: ip                                                                                                        // 278
						}).timescheduler).second();                                                                                    // 278
					},                                                                                                              // 278
					job: function () {                                                                                              // 279
						cron_read_sensor(ip);                                                                                          // 279
						return ip + '_read sensors';                                                                                   // 279
					}                                                                                                               // 279
				});                                                                                                              // 276
			} else {                                                                                                          // 281
				if (SyncedCron.nextScheduledAtDate(ip + '_read sensors')) {                                                      // 281
					SyncedCron.remove(ip + '_read sensors');                                                                        // 281
				}                                                                                                                // 281
			}                                                                                                                 // 281
		},                                                                                                                 // 282
		added: function (id, s) {                                                                                          // 283
			var ip = Sensori.findOne({                                                                                        // 284
				_id: id                                                                                                          // 284
			}).ip;                                                                                                            // 284
                                                                                                                     // 284
			if (Sensori.findOne({                                                                                             // 285
				_id: id                                                                                                          // 285
			}).on === true) {                                                                                                 // 285
				console.log("Added sensor:", s.ip, s.on, s.timescheduler);                                                       // 286
				SyncedCron.add({                                                                                                 // 287
					name: ip + '_read sensors',                                                                                     // 288
					schedule: function (parser) {                                                                                   // 289
						return parser.recur().every(Sensori.findOne({                                                                  // 289
							ip: ip                                                                                                        // 289
						}).timescheduler).second();                                                                                    // 289
					},                                                                                                              // 289
					job: function () {                                                                                              // 290
						cron_read_sensor(ip);                                                                                          // 290
						return ip + '_read sensors';                                                                                   // 290
					}                                                                                                               // 290
				});                                                                                                              // 287
			}                                                                                                                 // 292
		}                                                                                                                  // 293
	});                                                                                                                 // 269
                                                                                                                     // 269
	function cron_watt_after(now, response) {                                                                           // 297
		var today = moment().format("YYYYMMDD");                                                                           // 298
		var matrix = [];                                                                                                   // 299
		var csvfs = '';                                                                                                    // 299
		var solararr = [];                                                                                                 // 299
                                                                                                                     // 299
		if (Raspberry) {                                                                                                   // 300
			csvfs = csvpath + today + ".csv";                                                                                 // 300
		} else {                                                                                                           // 300
			csvfs = csvpathwin;                                                                                               // 300
		} // Leggo immediatamente i valori de sensore per garantire il timeframe dei 5 minuti 		                           // 300
                                                                                                                     // 302
                                                                                                                     // 302
		if (fs.existsSync(csvfs)) {                                                                                        // 303
			matrix = fs.readFileSync(csvfs).toString().split("\n").map(function (row) {                                       // 304
				return {                                                                                                         // 304
					x: moment(today + " " + row.split(",")[0], "YYYYMMDD HH:mm").unix(),                                            // 304
					y: Number(row.split(",")[27])                                                                                   // 304
				};                                                                                                               // 304
			}).slice(1, -1);                                                                                                  // 304
			solararr = solar(matrix); //console.log('solarray',solarray);                                                     // 305
                                                                                                                     // 306
			Watt.update({                                                                                                     // 307
				day: today                                                                                                       // 307
			}, {                                                                                                              // 307
				$set: {                                                                                                          // 307
					solararr: solararr                                                                                              // 307
				}                                                                                                                // 307
			}, {                                                                                                              // 307
				upsert: true,                                                                                                    // 307
				multi: false                                                                                                     // 307
			});                                                                                                               // 307
		} else {                                                                                                           // 308
			console.log('File not found: ', csvfs);                                                                           // 308
		}                                                                                                                  // 308
                                                                                                                     // 308
		if (response.data !== null) {                                                                                      // 310
			var pulsearr = pulse(today, now, response.data.Sensors[0].Total, solararr); //	console.log('pulserray',pulsearr);      
                                                                                                                     // 312
			Watt.update({                                                                                                     // 313
				day: today                                                                                                       // 313
			}, {                                                                                                              // 313
				$set: {                                                                                                          // 313
					pulsearr: pulsearr                                                                                              // 313
				}                                                                                                                // 313
			}, {                                                                                                              // 313
				upsert: true,                                                                                                    // 313
				multi: false                                                                                                     // 313
			});                                                                                                               // 313
		} else {// console.log('Warning cron_watt (problem reading sensor):',today,' - ',response);                        // 314
		}                                                                                                                  // 316
	}                                                                                                                   // 317
                                                                                                                     // 317
	function pulse(date, now, ytmp, solararr) {                                                                         // 320
		var b = [];                                                                                                        // 321
		var x0 = 0;                                                                                                        // 321
		var y0 = 0;                                                                                                        // 321
		var e = Watt.findOne({                                                                                             // 321
			day: date                                                                                                         // 321
		});                                                                                                                // 321
		var sx = 0;                                                                                                        // 321
		var sy = 0;                                                                                                        // 321
		console.log('solararr.length', solararr.length);                                                                   // 322
                                                                                                                     // 322
		if (solararr.length > 0) {                                                                                         // 324
			sx = solararr[solararr.length - 1].x;                                                                             // 324
			sy = solararr[solararr.length - 1].y;                                                                             // 324
		}                                                                                                                  // 324
                                                                                                                     // 324
		if (e && e.pulsearr) {                                                                                             // 325
			e.pulsearr.push({                                                                                                 // 326
				x: now,                                                                                                          // 326
				y: 0,                                                                                                            // 326
				ytmp: ytmp                                                                                                       // 326
			});                                                                                                               // 326
			e.pulsearr.forEach(function (p) {                                                                                 // 327
				var x1 = p.x;                                                                                                    // 328
				var y1 = p.ytmp;                                                                                                 // 328
				var deltat = (x1 - x0) / 1000;                                                                                   // 328
                                                                                                                     // 328
				if (deltat <= 0 || y1 < y0) {                                                                                    // 329
					console.log('!!!  y1:', y1, 'y0:', y0, 'x1:', x1, 'x0:', x0);                                                   // 329
				}                                                                                                                // 329
                                                                                                                     // 329
				;                                                                                                                // 329
                                                                                                                     // 329
				if (deltat > 0 && y1 - y0 >= 0) {                                                                                // 331
					var y = Math.round((y1 - y0) * 3600 / deltat, 3);                                                               // 332
                                                                                                                     // 332
					if (now === sx) {                                                                                               // 333
						if (sy >= y) {                                                                                                 // 333
							y = sy + y;                                                                                                   // 333
						} else {                                                                                                       // 333
							y = sy - y;                                                                                                   // 333
						}                                                                                                              // 333
					}                                                                                                               // 333
                                                                                                                     // 333
					console.log('now', now, 'sx', sx, 'sy', sy, 'y', y, 'y1', y1, 'y0', y0);                                        // 334
					b.push({                                                                                                        // 335
						x: x1,                                                                                                         // 335
						y: y,                                                                                                          // 335
						ytmp: y1                                                                                                       // 335
					});                                                                                                             // 335
				} else {                                                                                                         // 336
					console.log('Warning (pulse) deltat or (y1-y0):', deltat, '|', y1 - y0);                                        // 336
				}                                                                                                                // 336
                                                                                                                     // 336
				x0 = x1;                                                                                                         // 337
				y0 = y1;                                                                                                         // 337
			});                                                                                                               // 338
		} else {                                                                                                           // 339
			b.push({                                                                                                          // 339
				x: now,                                                                                                          // 339
				y: 0,                                                                                                            // 339
				ytmp: ytmp                                                                                                       // 339
			});                                                                                                               // 339
			console.log('First entry for pulsearr:', now);                                                                    // 339
		}                                                                                                                  // 339
                                                                                                                     // 339
		return b;                                                                                                          // 340
	}                                                                                                                   // 341
                                                                                                                     // 341
	function solar(matrix) {                                                                                            // 344
		var b = [];                                                                                                        // 345
		var x0 = 0;                                                                                                        // 345
		var y0 = 0;                                                                                                        // 345
                                                                                                                     // 345
		if (matrix) {                                                                                                      // 346
			matrix.forEach(function (s) {                                                                                     // 347
				var x1 = s.x;                                                                                                    // 348
				var y1 = s.y;                                                                                                    // 348
				var deltat = x1 - x0;                                                                                            // 348
                                                                                                                     // 348
				if (deltat > 0) {                                                                                                // 349
					var KwFull = Math.round((y1 - y0) * 3600 / deltat * 1000, 3); //console.log('solar:',{x: x1*1000, y: KwFull });
                                                                                                                     // 351
					b.push({                                                                                                        // 352
						x: x1 * 1000,                                                                                                  // 352
						y: KwFull                                                                                                      // 352
					});                                                                                                             // 352
				} else {//  console.log('Warning (solar) deltat:', deltat);                                                      // 353
				}                                                                                                                // 355
                                                                                                                     // 355
				x0 = x1;                                                                                                         // 356
				y0 = y1;                                                                                                         // 356
			});                                                                                                               // 357
		} else {                                                                                                           // 358
			console.log('No found MATRIX');                                                                                   // 358
		}                                                                                                                  // 358
                                                                                                                     // 358
		return b;                                                                                                          // 359
	}                                                                                                                   // 360
                                                                                                                     // 360
	function cron_watt() {                                                                                              // 363
		var now = Math.floor(moment().unix());                                                                             // 364
		var ip = Sensori.findOne({                                                                                         // 365
			tipo: 'pulse'                                                                                                     // 365
		}).ip; // Leggo immediatamente i valori del sensore per garantire il timeframe dei 5 minuti                        // 365
                                                                                                                     // 366
		var response = HTTP.get("http://" + ip + "/json", {});                                                             // 367
		setTimeout(cron_watt_after(now * 1000, response), 10000);                                                          // 368
	}                                                                                                                   // 369
                                                                                                                     // 369
	var watt = SyncedCron.add({                                                                                         // 372
		name: 'watt',                                                                                                      // 373
		schedule: function (parser) {                                                                                      // 374
			return parser.recur().every(5).minute();                                                                          // 374
		},                                                                                                                 // 374
		//schedule: function(parser) {return parser.recur().every(20).second();},                                          // 375
		job: cron_watt                                                                                                     // 376
	});                                                                                                                 // 372
	SyncedCron.config({                                                                                                 // 381
		log: false                                                                                                         // 381
	});                                                                                                                 // 381
	SyncedCron.start();                                                                                                 // 383
});                                                                                                                  // 385
Meteor.methods({                                                                                                     // 387
	"createUserAccount": function (options) {                                                                           // 388
		if (!Users.isAdmin(Meteor.userId())) {                                                                             // 389
			throw new Meteor.Error(403, "Access denied.");                                                                    // 390
		}                                                                                                                  // 391
                                                                                                                     // 391
		var userOptions = {};                                                                                              // 393
		if (options.username) userOptions.username = options.username;                                                     // 394
		if (options.email) userOptions.email = options.email;                                                              // 395
		if (options.password) userOptions.password = options.password;                                                     // 396
		if (options.profile) userOptions.profile = options.profile;                                                        // 397
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;                           // 398
		Accounts.createUser(userOptions);                                                                                  // 400
	},                                                                                                                  // 401
	"updateUserAccount": function (userId, options) {                                                                   // 402
		// only admin or users own profile                                                                                 // 403
		if (!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {                                              // 404
			throw new Meteor.Error(403, "Access denied.");                                                                    // 405
		} // non-admin user can change only profile                                                                        // 406
                                                                                                                     // 408
                                                                                                                     // 408
		if (!Users.isAdmin(Meteor.userId())) {                                                                             // 409
			var keys = Object.keys(options);                                                                                  // 410
                                                                                                                     // 410
			if (keys.length !== 1 || !options.profile) {                                                                      // 411
				throw new Meteor.Error(403, "Access denied.");                                                                   // 412
			}                                                                                                                 // 413
		}                                                                                                                  // 414
                                                                                                                     // 414
		var userOptions = {};                                                                                              // 416
		if (options.username) userOptions.username = options.username;                                                     // 417
		if (options.email) userOptions.email = options.email;                                                              // 418
		if (options.password) userOptions.password = options.password;                                                     // 419
		if (options.profile) userOptions.profile = options.profile;                                                        // 420
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;                           // 422
		if (options.roles) userOptions.roles = options.roles;                                                              // 423
                                                                                                                     // 423
		if (userOptions.email) {                                                                                           // 425
			var email = userOptions.email;                                                                                    // 426
			delete userOptions.email;                                                                                         // 427
			var userData = Users.findOne(this.userId);                                                                        // 428
                                                                                                                     // 428
			if (userData.emails && !userData.emails.find(function (mail) {                                                    // 429
				return mail.address == email;                                                                                    // 429
			})) {                                                                                                             // 429
				userOptions.emails = [{                                                                                          // 430
					address: email                                                                                                  // 430
				}];                                                                                                              // 430
			}                                                                                                                 // 431
		}                                                                                                                  // 432
                                                                                                                     // 432
		var password = "";                                                                                                 // 434
                                                                                                                     // 434
		if (userOptions.password) {                                                                                        // 435
			password = userOptions.password;                                                                                  // 436
			delete userOptions.password;                                                                                      // 437
		}                                                                                                                  // 438
                                                                                                                     // 438
		if (userOptions) {                                                                                                 // 440
			for (var key in meteorBabelHelpers.sanitizeForInObject(userOptions)) {                                            // 441
				var obj = userOptions[key];                                                                                      // 442
                                                                                                                     // 442
				if (_.isObject(obj)) {                                                                                           // 443
					for (var k in meteorBabelHelpers.sanitizeForInObject(obj)) {                                                    // 444
						userOptions[key + "." + k] = obj[k];                                                                           // 445
					}                                                                                                               // 446
                                                                                                                     // 446
					delete userOptions[key];                                                                                        // 447
				}                                                                                                                // 448
			}                                                                                                                 // 449
                                                                                                                     // 449
			Users.update(userId, {                                                                                            // 450
				$set: userOptions                                                                                                // 450
			});                                                                                                               // 450
		}                                                                                                                  // 451
                                                                                                                     // 451
		if (password) {                                                                                                    // 453
			Accounts.setPassword(userId, password);                                                                           // 454
		}                                                                                                                  // 455
	},                                                                                                                  // 456
	"sendMail": function (options) {                                                                                    // 458
		this.unblock();                                                                                                    // 459
		Email.send(options);                                                                                               // 461
	}                                                                                                                   // 462
});                                                                                                                  // 387
Accounts.onCreateUser(function (options, user) {                                                                     // 465
	user.roles = ["user"];                                                                                              // 466
                                                                                                                     // 466
	if (options.profile) {                                                                                              // 468
		user.profile = options.profile;                                                                                    // 469
	}                                                                                                                   // 470
                                                                                                                     // 470
	if (!Users.findOne({                                                                                                // 472
		roles: "admin"                                                                                                     // 472
	}) && user.roles.indexOf("admin") < 0) {                                                                            // 472
		user.roles.push("admin");                                                                                          // 473
	}                                                                                                                   // 474
                                                                                                                     // 474
	return user;                                                                                                        // 476
});                                                                                                                  // 477
Accounts.validateLoginAttempt(function (info) {                                                                      // 479
	// reject users with role "blocked"                                                                                 // 481
	if (info.user && Users.isInRole(info.user._id, "blocked")) {                                                        // 482
		throw new Meteor.Error(403, "Your account is blocked.");                                                           // 483
	}                                                                                                                   // 484
                                                                                                                     // 484
	if (verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified) {     // 486
		throw new Meteor.Error(499, "E-mail not verified.");                                                               // 487
	}                                                                                                                   // 488
                                                                                                                     // 488
	return true;                                                                                                        // 490
});                                                                                                                  // 491
Users.before.insert(function (userId, doc) {                                                                         // 494
	if (doc.emails && doc.emails[0] && doc.emails[0].address) {                                                         // 495
		doc.profile = doc.profile || {};                                                                                   // 496
		doc.profile.email = doc.emails[0].address;                                                                         // 497
	} else {                                                                                                            // 498
		// oauth                                                                                                           // 499
		if (doc.services) {                                                                                                // 500
			// google e-mail                                                                                                  // 501
			if (doc.services.google && doc.services.google.email) {                                                           // 502
				doc.profile = doc.profile || {};                                                                                 // 503
				doc.profile.email = doc.services.google.email;                                                                   // 504
			} else {                                                                                                          // 505
				// github e-mail                                                                                                 // 506
				if (doc.services.github && doc.services.github.accessToken) {                                                    // 507
					var github = new GitHub({                                                                                       // 508
						version: "3.0.0",                                                                                              // 509
						timeout: 5000                                                                                                  // 510
					});                                                                                                             // 508
					github.authenticate({                                                                                           // 513
						type: "oauth",                                                                                                 // 514
						token: doc.services.github.accessToken                                                                         // 515
					});                                                                                                             // 513
                                                                                                                     // 513
					try {                                                                                                           // 518
						var result = github.user.getEmails({});                                                                        // 519
                                                                                                                     // 519
						var email = _.findWhere(result, {                                                                              // 520
							primary: true                                                                                                 // 520
						});                                                                                                            // 520
                                                                                                                     // 520
						if (!email && result.length && _.isString(result[0])) {                                                        // 521
							email = {                                                                                                     // 522
								email: result[0]                                                                                             // 522
							};                                                                                                            // 522
						}                                                                                                              // 523
                                                                                                                     // 523
						if (email) {                                                                                                   // 525
							doc.profile = doc.profile || {};                                                                              // 526
							doc.profile.email = email.email;                                                                              // 527
						}                                                                                                              // 528
					} catch (e) {                                                                                                   // 529
						console.log(e);                                                                                                // 530
					}                                                                                                               // 531
				} else {                                                                                                         // 532
					// linkedin email                                                                                               // 533
					if (doc.services.linkedin && doc.services.linkedin.emailAddress) {                                              // 534
						doc.profile = doc.profile || {};                                                                               // 535
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;                     // 536
						doc.profile.email = doc.services.linkedin.emailAddress;                                                        // 537
					} else {                                                                                                        // 538
						if (doc.services.facebook && doc.services.facebook.email) {                                                    // 539
							doc.profile = doc.profile || {};                                                                              // 540
							doc.profile.email = doc.services.facebook.email;                                                              // 541
						} else {                                                                                                       // 542
							if (doc.services.twitter && doc.services.twitter.email) {                                                     // 543
								doc.profile = doc.profile || {};                                                                             // 544
								doc.profile.email = doc.services.twitter.email;                                                              // 545
							} else {                                                                                                      // 546
								if (doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};                                                                            // 548
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;                                     // 549
								}                                                                                                            // 550
							}                                                                                                             // 551
						}                                                                                                              // 552
					}                                                                                                               // 553
				}                                                                                                                // 554
			}                                                                                                                 // 555
		}                                                                                                                  // 556
	}                                                                                                                   // 557
});                                                                                                                  // 558
Users.before.update(function (userId, doc, fieldNames, modifier, options) {                                          // 560
	if (modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {      // 561
		modifier.$set.profile.email = modifier.$set.emails[0].address;                                                     // 562
	}                                                                                                                   // 563
});                                                                                                                  // 564
Accounts.onLogin(function (info) {});                                                                                // 566
                                                                                                                     // 566
Accounts.urls.resetPassword = function (token) {                                                                     // 570
	return Meteor.absoluteUrl('reset_password/' + token);                                                               // 571
};                                                                                                                   // 572
                                                                                                                     // 570
Accounts.urls.verifyEmail = function (token) {                                                                       // 574
	return Meteor.absoluteUrl('verify_email/' + token);                                                                 // 575
};                                                                                                                   // 576
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./lib/object_utils.js");
require("./lib/string_utils.js");
require("./both/collections/caldaia.js");
require("./both/collections/cronotermostato.js");
require("./both/collections/rangetemp.js");
require("./both/collections/sensori.js");
require("./both/collections/watt.js");
require("./server/collections/caldaia.js");
require("./server/collections/cronotermostato.js");
require("./server/collections/rangetemp.js");
require("./server/collections/sensori.js");
require("./server/collections/watt.js");
require("./server/controllers/router.js");
require("./server/methods/caldaia.js");
require("./server/methods/cronotermostato.js");
require("./server/methods/rangetemp.js");
require("./server/methods/sensori.js");
require("./server/methods/watt.js");
require("./server/publish/caldaia.js");
require("./server/publish/cronotermostato.js");
require("./server/publish/rangetemp.js");
require("./server/publish/sensori.js");
require("./server/publish/watt.js");
require("./server/server.js");
//# sourceMappingURL=app.js.map
