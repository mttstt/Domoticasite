var require = meteorInstall({"lib":{"case_utils.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// lib/case_utils.js                                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var hasSpace = /\s/;                                                                                                 // 1
var hasSeparator = /[\W_]/;                                                                                          // 2
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/; /**                                                                        // 3
                                           * Remove any starting case from a `string`, like camel or snake, but keep
                                           * spaces and punctuation that may be important otherwise.                 // 5
                                           *                                                                         // 5
                                           * @param {String} string                                                  // 5
                                           * @return {String}                                                        // 5
                                           */                                                                        // 5
                                                                                                                     // 5
this.toNoCase = function (string) {                                                                                  // 13
  if (hasSpace.test(string)) return string.toLowerCase();                                                            // 14
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();                                // 15
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase();                                                // 16
  return string.toLowerCase();                                                                                       // 17
}; /**                                                                                                               // 18
    * Separator splitter.                                                                                            // 20
    */                                                                                                               // 20
                                                                                                                     // 20
var separatorSplitter = /[\W_]+(.|$)/g; /**                                                                          // 24
                                         * Un-separate a `string`.                                                   // 26
                                         *                                                                           // 26
                                         * @param {String} string                                                    // 26
                                         * @return {String}                                                          // 26
                                         */                                                                          // 26
                                                                                                                     // 26
function unseparate(string) {                                                                                        // 33
  return string.replace(separatorSplitter, function (m, next) {                                                      // 34
    return next ? ' ' + next : '';                                                                                   // 35
  });                                                                                                                // 36
} /**                                                                                                                // 37
   * Camelcase splitter.                                                                                             // 39
   */                                                                                                                // 39
                                                                                                                     // 39
var camelSplitter = /(.)([A-Z]+)/g; /**                                                                              // 43
                                     * Un-camelcase a `string`.                                                      // 45
                                     *                                                                               // 45
                                     * @param {String} string                                                        // 45
                                     * @return {String}                                                              // 45
                                     */                                                                              // 45
                                                                                                                     // 45
function uncamelize(string) {                                                                                        // 52
  return string.replace(camelSplitter, function (m, previous, uppers) {                                              // 53
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');                                                // 54
  });                                                                                                                // 55
}                                                                                                                    // 56
                                                                                                                     // 56
this.toSpaceCase = function (string) {                                                                               // 58
  return toNoCase(string).replace(/[\W_]+(.|$)/g, function (matches, match) {                                        // 59
    return match ? ' ' + match : '';                                                                                 // 60
  }).trim();                                                                                                         // 61
};                                                                                                                   // 62
                                                                                                                     // 58
this.toCamelCase = function (string) {                                                                               // 64
  return toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {                                         // 65
    return letter.toUpperCase();                                                                                     // 66
  });                                                                                                                // 67
};                                                                                                                   // 68
                                                                                                                     // 64
this.toSnakeCase = function (string) {                                                                               // 70
  return toSpaceCase(string).replace(/\s/g, '_');                                                                    // 71
};                                                                                                                   // 72
                                                                                                                     // 70
this.toKebabCase = function (string) {                                                                               // 74
  return toSpaceCase(string).replace(/\s/g, '-');                                                                    // 75
};                                                                                                                   // 76
                                                                                                                     // 74
this.toTitleCase = function (string) {                                                                               // 78
  var str = toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {                                      // 79
    return " " + letter.toUpperCase();                                                                               // 80
  });                                                                                                                // 81
                                                                                                                     // 79
  if (str) {                                                                                                         // 83
    str = str.charAt(0).toUpperCase() + str.slice(1);                                                                // 84
  }                                                                                                                  // 85
                                                                                                                     // 85
  return str;                                                                                                        // 86
};                                                                                                                   // 87
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"object_utils.js":function(require){

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
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin", "user"]));                             // 8
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
		return false;                                                                                                      // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return false;                                                                                                      // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return false;                                                                                                      // 11
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
		return false;                                                                                                      // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return false;                                                                                                      // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return false;                                                                                                      // 11
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
		return false;                                                                                                      // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return false;                                                                                                      // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return false;                                                                                                      // 11
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
		return false;                                                                                                      // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return false;                                                                                                      // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return false;                                                                                                      // 11
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
		return false;                                                                                                      // 3
	},                                                                                                                  // 4
	update: function (userId, doc, fields, modifier) {                                                                  // 6
		return false;                                                                                                      // 7
	},                                                                                                                  // 8
	remove: function (userId, doc) {                                                                                    // 10
		return false;                                                                                                      // 11
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

}},"server.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server/server.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
	var fs = require("fs");                                                                                             // 113
                                                                                                                     // 113
	var csvpath = "/var/www/123solar/data/invt1/csv/";                                                                  // 114
	var csvpathwin = "C://Users//matteo//Documents//GitHub//Domoticasite//files//20170318.csv";                         // 115
	console.log('=>', process.env.ROOT_URL, ':', process.env.PORT);                                                     // 117
                                                                                                                     // 117
	var os = require('os');                                                                                             // 119
                                                                                                                     // 119
	console.log('=> Domoticasite Server:', os.type(), ' - ', os.release(), ' - ', os.platform());                       // 120
	var Raspberry = process.env.WIRINGPI_GPIOMEM == '1' ? true : false;                                                 // 122
	console.log('=> Raspberry? ', Raspberry); //                                                                        // 123
	// funzione TODO: feature per cercare nuovi sensori in rete e comunicarne l'esistenza all'amministratore per la loro  inclusione.
	//                                                                                                                  // 128
                                                                                                                     // 128
	function find_sensor() {                                                                                            // 129
		var base = "192.168.1.";                                                                                           // 130
		var i = 1;                                                                                                         // 131
                                                                                                                     // 131
		for (i = 1; index < 254; ++index) {                                                                                // 132
			var ip = base + i;                                                                                                // 133
			var oldip = Sensori.find({}).ip.map(function (row) {                                                              // 134
				return row;                                                                                                      // 134
			});                                                                                                               // 134
                                                                                                                     // 134
			try {                                                                                                             // 136
				response = HTTP.get("http://" + ip + "/json", {});                                                               // 136
                                                                                                                     // 136
				if (response.data.Sensors[0].TaskName !== null) {                                                                // 137
					Sensori.insert({                                                                                                // 138
						ip: ip,                                                                                                        // 138
						location: response.data.Sensors[0].TaskName,                                                                   // 138
						note: '-',                                                                                                     // 138
						tipo: '',                                                                                                      // 138
						active: true,                                                                                                  // 138
						timescheduler: 30,                                                                                             // 138
						on: true                                                                                                       // 138
					});                                                                                                             // 138
				}                                                                                                                // 139
			} catch (e) {                                                                                                     // 140
				console.log('no found', ip, ' -', e);                                                                            // 141
			}                                                                                                                 // 141
		}                                                                                                                  // 142
	}                                                                                                                   // 143
                                                                                                                     // 143
	if (Sensori.find().count() === 0) {                                                                                 // 146
		var VariantSensoriSchema = {}; //Edit.insert({text: 'o'});                                                         // 147
                                                                                                                     // 148
		Sensori.attachSchema(VariantSensoriSchema, {                                                                       // 149
			ip: {                                                                                                             // 149
				optional: false                                                                                                  // 149
			},                                                                                                                // 149
			location: {                                                                                                       // 149
				optional: true                                                                                                   // 149
			},                                                                                                                // 149
			note: {                                                                                                           // 149
				optional: true                                                                                                   // 149
			},                                                                                                                // 149
			tipo: {                                                                                                           // 149
				optional: true                                                                                                   // 149
			},                                                                                                                // 149
			temp: {                                                                                                           // 149
				optional: true                                                                                                   // 149
			},                                                                                                                // 149
			hum: {                                                                                                            // 149
				optional: true                                                                                                   // 149
			},                                                                                                                // 149
			active: {                                                                                                         // 149
				optional: true                                                                                                   // 149
			}                                                                                                                 // 149
		});                                                                                                                // 149
		Rangetemp.insert({                                                                                                 // 150
			grado: '15'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '16'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '17'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '18'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '19'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '20'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '21'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '22'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '23'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '24'                                                                                                       // 150
		});                                                                                                                // 150
		Rangetemp.insert({                                                                                                 // 150
			grado: '25'                                                                                                       // 150
		});                                                                                                                // 150
		Caldaia.insert({                                                                                                   // 151
			statocaldaia: false,                                                                                              // 151
			statoriscaldamento: false,                                                                                        // 151
			statotermostato: false,                                                                                           // 151
			sensoretermostato: 'Cameretta',                                                                                   // 151
			isteresi: '0.5',                                                                                                  // 151
			timescheduler: '60'                                                                                               // 151
		});                                                                                                                // 151
		Sensori.insert({                                                                                                   // 152
			ip: '127.0.0.1',                                                                                                  // 152
			location: 'Garage',                                                                                               // 152
			note: '-',                                                                                                        // 152
			tipo: 'DHT22 (on PIN 22)',                                                                                        // 152
			active: false,                                                                                                    // 152
			timescheduler: 30,                                                                                                // 152
			on: true                                                                                                          // 152
		});                                                                                                                // 152
		Sensori.insert({                                                                                                   // 153
			ip: '192.168.1.111',                                                                                              // 153
			location: 'Contatore',                                                                                            // 153
			note: 'Consumi Enel',                                                                                             // 153
			tipo: 'pulse',                                                                                                    // 153
			active: false,                                                                                                    // 153
			timescheduler: 30,                                                                                                // 153
			on: true                                                                                                          // 153
		});                                                                                                                // 153
		Sensori.insert({                                                                                                   // 154
			ip: '192.168.1.112',                                                                                              // 154
			location: 'Sala',                                                                                                 // 154
			note: '-',                                                                                                        // 154
			tipo: 'DHT22',                                                                                                    // 154
			active: false,                                                                                                    // 154
			timescheduler: 30,                                                                                                // 154
			on: true                                                                                                          // 154
		});                                                                                                                // 154
		Sensori.insert({                                                                                                   // 155
			ip: '192.168.1.113',                                                                                              // 155
			location: 'Cameretta',                                                                                            // 155
			note: '-',                                                                                                        // 155
			tipo: 'DHT22',                                                                                                    // 155
			active: false,                                                                                                    // 155
			timescheduler: 30,                                                                                                // 155
			on: true                                                                                                          // 155
		});                                                                                                                // 155
		Sensori.insert({                                                                                                   // 156
			ip: '192.168.1.114',                                                                                              // 156
			location: 'Ingresso',                                                                                             // 156
			note: '-',                                                                                                        // 156
			tipo: 'DHT22',                                                                                                    // 156
			active: false,                                                                                                    // 156
			timescheduler: 30,                                                                                                // 156
			on: true                                                                                                          // 156
		});                                                                                                                // 156
		Cronotermostato.insert({                                                                                           // 157
			day: 'Lunedì',                                                                                                    // 157
			dayofweek: '1',                                                                                                   // 157
			h001: '18',                                                                                                       // 157
			h012: '18',                                                                                                       // 157
			h023: '18',                                                                                                       // 157
			h034: '18',                                                                                                       // 157
			h045: '18',                                                                                                       // 157
			h056: '18',                                                                                                       // 157
			h067: '18',                                                                                                       // 157
			h078: '18',                                                                                                       // 157
			h089: '18',                                                                                                       // 157
			h0910: '18',                                                                                                      // 157
			h1011: '18',                                                                                                      // 157
			h1112: '18',                                                                                                      // 157
			h1213: '18',                                                                                                      // 157
			h1314: '18',                                                                                                      // 157
			h1415: '18',                                                                                                      // 157
			h1516: '18',                                                                                                      // 157
			h1617: '18',                                                                                                      // 157
			h1718: '18',                                                                                                      // 157
			h1819: '18',                                                                                                      // 157
			h1920: '18',                                                                                                      // 157
			h2021: '18',                                                                                                      // 157
			h2122: '18',                                                                                                      // 157
			h2223: '18',                                                                                                      // 157
			h2324: '18'                                                                                                       // 157
		});                                                                                                                // 157
		Cronotermostato.insert({                                                                                           // 158
			day: 'Martedì',                                                                                                   // 158
			dayofweek: '2',                                                                                                   // 158
			h001: '18',                                                                                                       // 158
			h012: '18',                                                                                                       // 158
			h023: '18',                                                                                                       // 158
			h034: '18',                                                                                                       // 158
			h045: '18',                                                                                                       // 158
			h056: '18',                                                                                                       // 158
			h067: '18',                                                                                                       // 158
			h078: '18',                                                                                                       // 158
			h089: '18',                                                                                                       // 158
			h0910: '18',                                                                                                      // 158
			h1011: '18',                                                                                                      // 158
			h1112: '18',                                                                                                      // 158
			h1213: '18',                                                                                                      // 158
			h1314: '18',                                                                                                      // 158
			h1415: '18',                                                                                                      // 158
			h1516: '18',                                                                                                      // 158
			h1617: '18',                                                                                                      // 158
			h1718: '18',                                                                                                      // 158
			h1819: '18',                                                                                                      // 158
			h1920: '18',                                                                                                      // 158
			h2021: '18',                                                                                                      // 158
			h2122: '18',                                                                                                      // 158
			h2223: '18',                                                                                                      // 158
			h2324: '18'                                                                                                       // 158
		});                                                                                                                // 158
		Cronotermostato.insert({                                                                                           // 159
			day: 'Mercoledì',                                                                                                 // 159
			dayofweek: '3',                                                                                                   // 159
			h001: '18',                                                                                                       // 159
			h012: '18',                                                                                                       // 159
			h023: '18',                                                                                                       // 159
			h034: '18',                                                                                                       // 159
			h045: '18',                                                                                                       // 159
			h056: '18',                                                                                                       // 159
			h067: '18',                                                                                                       // 159
			h078: '18',                                                                                                       // 159
			h089: '18',                                                                                                       // 159
			h0910: '18',                                                                                                      // 159
			h1011: '18',                                                                                                      // 159
			h1112: '18',                                                                                                      // 159
			h1213: '18',                                                                                                      // 159
			h1314: '18',                                                                                                      // 159
			h1415: '18',                                                                                                      // 159
			h1516: '18',                                                                                                      // 159
			h1617: '18',                                                                                                      // 159
			h1718: '18',                                                                                                      // 159
			h1819: '18',                                                                                                      // 159
			h1920: '18',                                                                                                      // 159
			h2021: '18',                                                                                                      // 159
			h2122: '18',                                                                                                      // 159
			h2223: '18',                                                                                                      // 159
			h2324: '18'                                                                                                       // 159
		});                                                                                                                // 159
		Cronotermostato.insert({                                                                                           // 160
			day: 'Giovedì',                                                                                                   // 160
			dayofweek: '4',                                                                                                   // 160
			h001: '18',                                                                                                       // 160
			h012: '18',                                                                                                       // 160
			h023: '18',                                                                                                       // 160
			h034: '18',                                                                                                       // 160
			h045: '18',                                                                                                       // 160
			h056: '18',                                                                                                       // 160
			h067: '18',                                                                                                       // 160
			h078: '18',                                                                                                       // 160
			h089: '18',                                                                                                       // 160
			h0910: '18',                                                                                                      // 160
			h1011: '18',                                                                                                      // 160
			h1112: '18',                                                                                                      // 160
			h1213: '18',                                                                                                      // 160
			h1314: '18',                                                                                                      // 160
			h1415: '18',                                                                                                      // 160
			h1516: '18',                                                                                                      // 160
			h1617: '18',                                                                                                      // 160
			h1718: '18',                                                                                                      // 160
			h1819: '18',                                                                                                      // 160
			h1920: '18',                                                                                                      // 160
			h2021: '18',                                                                                                      // 160
			h2122: '18',                                                                                                      // 160
			h2223: '18',                                                                                                      // 160
			h2324: '18'                                                                                                       // 160
		});                                                                                                                // 160
		Cronotermostato.insert({                                                                                           // 161
			day: 'Venerdì',                                                                                                   // 161
			dayofweek: '5',                                                                                                   // 161
			h001: '18',                                                                                                       // 161
			h012: '18',                                                                                                       // 161
			h023: '18',                                                                                                       // 161
			h034: '18',                                                                                                       // 161
			h045: '18',                                                                                                       // 161
			h056: '18',                                                                                                       // 161
			h067: '18',                                                                                                       // 161
			h078: '18',                                                                                                       // 161
			h089: '18',                                                                                                       // 161
			h0910: '18',                                                                                                      // 161
			h1011: '18',                                                                                                      // 161
			h1112: '18',                                                                                                      // 161
			h1213: '18',                                                                                                      // 161
			h1314: '18',                                                                                                      // 161
			h1415: '18',                                                                                                      // 161
			h1516: '18',                                                                                                      // 161
			h1617: '18',                                                                                                      // 161
			h1718: '18',                                                                                                      // 161
			h1819: '18',                                                                                                      // 161
			h1920: '18',                                                                                                      // 161
			h2021: '18',                                                                                                      // 161
			h2122: '18',                                                                                                      // 161
			h2223: '18',                                                                                                      // 161
			h2324: '18'                                                                                                       // 161
		});                                                                                                                // 161
		Cronotermostato.insert({                                                                                           // 162
			day: 'Sabato',                                                                                                    // 162
			dayofweek: '6',                                                                                                   // 162
			h001: '18',                                                                                                       // 162
			h012: '18',                                                                                                       // 162
			h023: '18',                                                                                                       // 162
			h034: '18',                                                                                                       // 162
			h045: '18',                                                                                                       // 162
			h056: '18',                                                                                                       // 162
			h067: '18',                                                                                                       // 162
			h078: '18',                                                                                                       // 162
			h089: '18',                                                                                                       // 162
			h0910: '18',                                                                                                      // 162
			h1011: '18',                                                                                                      // 162
			h1112: '18',                                                                                                      // 162
			h1213: '18',                                                                                                      // 162
			h1314: '18',                                                                                                      // 162
			h1415: '18',                                                                                                      // 162
			h1516: '18',                                                                                                      // 162
			h1617: '18',                                                                                                      // 162
			h1718: '18',                                                                                                      // 162
			h1819: '18',                                                                                                      // 162
			h1920: '18',                                                                                                      // 162
			h2021: '18',                                                                                                      // 162
			h2122: '18',                                                                                                      // 162
			h2223: '18',                                                                                                      // 162
			h2324: '18'                                                                                                       // 162
		});                                                                                                                // 162
		Cronotermostato.insert({                                                                                           // 163
			day: 'Domenica',                                                                                                  // 163
			dayofweek: '7',                                                                                                   // 163
			h001: '18',                                                                                                       // 163
			h012: '18',                                                                                                       // 163
			h023: '18',                                                                                                       // 163
			h034: '18',                                                                                                       // 163
			h045: '18',                                                                                                       // 163
			h056: '18',                                                                                                       // 163
			h067: '18',                                                                                                       // 163
			h078: '18',                                                                                                       // 163
			h089: '18',                                                                                                       // 163
			h0910: '18',                                                                                                      // 163
			h1011: '18',                                                                                                      // 163
			h1112: '18',                                                                                                      // 163
			h1213: '18',                                                                                                      // 163
			h1314: '18',                                                                                                      // 163
			h1415: '18',                                                                                                      // 163
			h1516: '18',                                                                                                      // 163
			h1617: '18',                                                                                                      // 163
			h1718: '18',                                                                                                      // 163
			h1819: '18',                                                                                                      // 163
			h1920: '18',                                                                                                      // 163
			h2021: '18',                                                                                                      // 163
			h2122: '18',                                                                                                      // 163
			h2223: '18',                                                                                                      // 163
			h2324: '18'                                                                                                       // 163
		});                                                                                                                // 163
	}                                                                                                                   // 164
                                                                                                                     // 164
	if (Raspberry) {                                                                                                    // 168
		//  import wpi from 'wiringpi-node';                                                                               // 169
		var wpi = require('wiringpi-node');                                                                                // 170
                                                                                                                     // 170
		wpi.setup('sys'); // import sensorLib from 'node-dht-sensor';                                                      // 171
                                                                                                                     // 173
		var sensorLib = require('node-dht-sensor');                                                                        // 174
                                                                                                                     // 174
		var GpioPin = 22;                                                                                                  // 175
		var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302                                                      // 176
                                                                                                                     // 176
		if (!sensorLib.initialize(sensorType, GpioPin)) {                                                                  // 177
			console.log('Failed to initialize sensor');                                                                       // 178
			process.exit(1);                                                                                                  // 179
		}                                                                                                                  // 180
                                                                                                                     // 180
		var readout = sensorLib.read();                                                                                    // 181
		console.log('Pin GPIO del sensore sul Raspberry: ' + GpioPin + " - T:", readout.temperature.toFixed(1), "- U:", readout.humidity.toFixed(1));
	}                                                                                                                   // 183
                                                                                                                     // 183
	function switchOnOff(onoff) {                                                                                       // 187
		var state = onoff ? 1 : 0;                                                                                         // 188
		console.log('function switchOnOff: ', state);                                                                      // 189
                                                                                                                     // 189
		if (Raspberry) {                                                                                                   // 190
			wpi.pinMode(7, wpi.OUTPUT);                                                                                       // 190
			wpi.digitalWrite(7, state);                                                                                       // 190
			console.log('function switchOnOff : Inviato segnale al relay');                                                   // 190
		}                                                                                                                  // 190
	}                                                                                                                   // 191
                                                                                                                     // 191
	function cron_read_sensor(ip) {                                                                                     // 194
		var tipo = Sensori.findOne({                                                                                       // 195
			ip: ip                                                                                                            // 195
		}).tipo;                                                                                                           // 195
                                                                                                                     // 195
		if (tipo == 'DHT22') {                                                                                             // 196
			try {                                                                                                             // 197
				var response = HTTP.get("http://" + ip + "/json", {});                                                           // 198
                                                                                                                     // 198
				if (response.data !== null) {                                                                                    // 199
					//console.log(ip," (" , response.data.Sensors[0].TaskName,") - T:",response.data.Sensors[0].Temperature ,"- U:", response.data.Sensors[0].Humidity);
					Sensori.update({                                                                                                // 201
						ip: ip                                                                                                         // 201
					}, {                                                                                                            // 201
						$set: {                                                                                                        // 201
							hum: response.data.Sensors[0].Humidity,                                                                       // 201
							active: true,                                                                                                 // 201
							temp: response.data.Sensors[0].Temperature,                                                                   // 201
							location: response.data.Sensors[0].TaskName                                                                   // 201
						}                                                                                                              // 201
					});                                                                                                             // 201
				} else {                                                                                                         // 202
					console.log('Warning reading sensor:', ip);                                                                     // 202
					Sensori.update({                                                                                                // 202
						ip: ip                                                                                                         // 202
					}, {                                                                                                            // 202
						$set: {                                                                                                        // 202
							active: false                                                                                                 // 202
						}                                                                                                              // 202
					});                                                                                                             // 202
				}                                                                                                                // 202
			} catch (e) {                                                                                                     // 203
				console.log('Warning reading sensor:', ip);                                                                      // 205
				Sensori.update({                                                                                                 // 206
					ip: ip                                                                                                          // 206
				}, {                                                                                                             // 206
					$set: {                                                                                                         // 206
						active: false                                                                                                  // 206
					}                                                                                                               // 206
				});                                                                                                              // 206
			}                                                                                                                 // 207
		} //	if (tipo == 'pulse')	{                                                                                        // 208
		//		HTTP.get("http://"+ip+"/json", {}, function( error, response ) {                                               // 211
		//				if ( error ) { console.log('Error:',ip, error); Sensori.update({ip: ip}, {$set:{ active: false}}); }         // 212
		//				else { if (response.data !== null) {                                                                         // 213
		//													// console.log(ip," (" , response.data.Sensors[0].TaskName,") - Count:", response.data.Sensors[0].Total);
		//													Sensori.update({ip: ip}, {$set:{ active: true, location: response.data.Sensors[0].TaskName, note: 'counter:'+response.data.Sensors[0].Total}});
		//													}	else {console.log(ip," - No data !"); Sensori.update({ip:ip}, {$set:{active: false}}); }          // 216
		//				}                                                                                                            // 217
		//		});                                                                                                            // 218
		//	}                                                                                                               // 219
                                                                                                                     // 219
                                                                                                                     // 219
		if (Raspberry && tipo == 'DHT22 (on PIN 22)') {                                                                    // 221
			var readout = sensorLib.read();                                                                                   // 222
                                                                                                                     // 222
			if (readout.temperature.toFixed(1) !== '0.0') {                                                                   // 223
				// console.log(ip," (Raspberry) - T:", readout.temperature.toFixed(1),"- U:", readout.humidity.toFixed(1));      // 224
				Sensori.update({                                                                                                 // 225
					ip: ip                                                                                                          // 225
				}, {                                                                                                             // 225
					$set: {                                                                                                         // 225
						hum: readout.humidity.toFixed(1),                                                                              // 225
						active: true,                                                                                                  // 225
						temp: readout.temperature.toFixed(1)                                                                           // 225
					}                                                                                                               // 225
				});                                                                                                              // 225
			}                                                                                                                 // 226
		}                                                                                                                  // 227
	}                                                                                                                   // 228
                                                                                                                     // 228
	function cron_cronotermostato() {                                                                                   // 231
		var today = moment().format('E');                                                                                  // 232
		var hournow = moment().format('HH');                                                                               // 233
		var temphour = Cronotermostato.find({                                                                              // 234
			dayofweek: parseInt(today)                                                                                        // 234
		}).map(function (o) {                                                                                              // 234
			return [o.h001, o.h012, o.h023, o.h034, o.h045, o.h056, o.h067, o.h078, o.h089, o.h0910, o.h1011, o.h1112, o.h1213, o.h1314, o.h1415, o.h1516, o.h1617, o.h1718, o.h1819, o.h1920, o.h2021, o.h2122, o.h2223, o.h2324];
		})[0][parseInt(hournow)];                                                                                          // 234
		var sensoretermostato = Caldaia.findOne({}).sensoretermostato;                                                     // 235
		var isteresi = Caldaia.findOne({}).isteresi;                                                                       // 236
		var temprilevata = Sensori.findOne({                                                                               // 237
			location: sensoretermostato                                                                                       // 237
		}).temp;                                                                                                           // 237
		console.log('today:', today, ' - hournow:', hournow, ' - temphour:', temphour, ' - sensoretermostato:', sensoretermostato, ' - isteresi:', isteresi, ' - temprilevata:', temprilevata);
                                                                                                                     // 238
		if (temphour - isteresi >= temprilevata) {                                                                         // 239
			Caldaia.update({}, {                                                                                              // 240
				$set: {                                                                                                          // 240
					statocaldaia: true                                                                                              // 240
				}                                                                                                                // 240
			});                                                                                                               // 240
			switchOnOff(true);                                                                                                // 241
		} else {                                                                                                           // 242
			Caldaia.update({}, {                                                                                              // 243
				$set: {                                                                                                          // 243
					statocaldaia: false                                                                                             // 243
				}                                                                                                                // 243
			});                                                                                                               // 243
			switchOnOff(false);                                                                                               // 244
		}                                                                                                                  // 245
	}                                                                                                                   // 246
                                                                                                                     // 246
	var termostato = Caldaia.find({}, {                                                                                 // 250
		fields: {                                                                                                          // 250
			_id: true,                                                                                                        // 250
			statotermostato: true,                                                                                            // 250
			timescheduler: true                                                                                               // 250
		}                                                                                                                  // 250
	}).observeChanges({                                                                                                 // 250
		changed: function (id, s) {                                                                                        // 251
			if (s.statotermostato === true) {                                                                                 // 252
				//stop                                                                                                           // 253
				if (SyncedCron.nextScheduledAtDate('cronotermostato')) {                                                         // 254
					SyncedCron.remove('cronotermostato');                                                                           // 254
				} //start                                                                                                        // 254
                                                                                                                     // 255
                                                                                                                     // 255
				SyncedCron.add({                                                                                                 // 256
					name: 'cronotermostato',                                                                                        // 256
					schedule: function (parser) {                                                                                   // 256
						return parser.recur().every(Caldaia.findOne().timescheduler).second();                                         // 256
					},                                                                                                              // 256
					job: cron_cronotermostato                                                                                       // 256
				});                                                                                                              // 256
				Caldaia.update({}, {                                                                                             // 257
					$set: {                                                                                                         // 257
						statoriscaldamento: true                                                                                       // 257
					}                                                                                                               // 257
				});                                                                                                              // 257
			} else {                                                                                                          // 258
				if (SyncedCron.nextScheduledAtDate('cronotermostato')) {                                                         // 258
					SyncedCron.remove('cronotermostato');                                                                           // 258
				}                                                                                                                // 258
			}                                                                                                                 // 258
		},                                                                                                                 // 259
		added: function (id, s) {                                                                                          // 260
			if (s.cronotermostato === true) {                                                                                 // 260
				switchOnOff(true);                                                                                               // 260
				Caldaia.update({}, {                                                                                             // 260
					$set: {                                                                                                         // 260
						statoriscaldamento: true                                                                                       // 260
					}                                                                                                               // 260
				});                                                                                                              // 260
			}                                                                                                                 // 260
		}                                                                                                                  // 260
	});                                                                                                                 // 250
	var riscaldamento = Caldaia.find({}, {                                                                              // 264
		fields: {                                                                                                          // 264
			statoriscaldamento: true                                                                                          // 264
		}                                                                                                                  // 264
	}).observeChanges({                                                                                                 // 264
		changed: function (id, s) {                                                                                        // 265
			// workaround: per qulache motivo non funziona s.on s.ip                                                          // 266
			if (s.statoriscaldamento === true) {                                                                              // 267
				switchOnOff(true);                                                                                               // 267
				Caldaia.update({}, {                                                                                             // 267
					$set: {                                                                                                         // 267
						statocaldaia: true                                                                                             // 267
					}                                                                                                               // 267
				});                                                                                                              // 267
			} else {                                                                                                          // 268
				switchOnOff(false);                                                                                              // 268
				Caldaia.update({}, {                                                                                             // 268
					$set: {                                                                                                         // 268
						statocaldaia: false,                                                                                           // 268
						statotermostato: false                                                                                         // 268
					}                                                                                                               // 268
				});                                                                                                              // 268
			}                                                                                                                 // 268
		},                                                                                                                 // 269
		added: function (id, s) {                                                                                          // 270
			if (s.statoriscaldamento === true) {                                                                              // 270
				switchOnOff(true);                                                                                               // 270
				Caldaia.update({}, {                                                                                             // 270
					$set: {                                                                                                         // 270
						statocaldaia: true                                                                                             // 270
					}                                                                                                               // 270
				});                                                                                                              // 270
			}                                                                                                                 // 270
		}                                                                                                                  // 270
	});                                                                                                                 // 264
	var on = Sensori.find({}, {                                                                                         // 274
		fields: {                                                                                                          // 274
			ip: true,                                                                                                         // 274
			on: true,                                                                                                         // 274
			timescheduler: true                                                                                               // 274
		}                                                                                                                  // 274
	}).observeChanges({                                                                                                 // 274
		changed: function (id, s) {                                                                                        // 275
			var ip = Sensori.findOne({                                                                                        // 276
				_id: id                                                                                                          // 276
			}).ip;                                                                                                            // 276
                                                                                                                     // 276
			if (Sensori.findOne({                                                                                             // 277
				_id: id                                                                                                          // 277
			}).on === true) {                                                                                                 // 277
				// shutdown                                                                                                      // 278
				if (SyncedCron.nextScheduledAtDate(ip + '_read sensors')) {                                                      // 279
					SyncedCron.remove(ip + '_read sensors');                                                                        // 279
				} //activatesensor                                                                                               // 279
                                                                                                                     // 280
                                                                                                                     // 280
				SyncedCron.add({                                                                                                 // 281
					name: ip + '_read sensors',                                                                                     // 282
					schedule: function (parser) {                                                                                   // 283
						return parser.recur().every(Sensori.findOne({                                                                  // 283
							ip: ip                                                                                                        // 283
						}).timescheduler).second();                                                                                    // 283
					},                                                                                                              // 283
					job: function () {                                                                                              // 284
						cron_read_sensor(ip);                                                                                          // 284
						return ip + '_read sensors';                                                                                   // 284
					}                                                                                                               // 284
				});                                                                                                              // 281
			} else {                                                                                                          // 286
				if (SyncedCron.nextScheduledAtDate(ip + '_read sensors')) {                                                      // 286
					SyncedCron.remove(ip + '_read sensors');                                                                        // 286
				}                                                                                                                // 286
			}                                                                                                                 // 286
		},                                                                                                                 // 287
		added: function (id, s) {                                                                                          // 288
			var ip = Sensori.findOne({                                                                                        // 289
				_id: id                                                                                                          // 289
			}).ip;                                                                                                            // 289
                                                                                                                     // 289
			if (Sensori.findOne({                                                                                             // 290
				_id: id                                                                                                          // 290
			}).on === true) {                                                                                                 // 290
				console.log("Added sensor:", s.ip, s.on, s.timescheduler);                                                       // 291
				SyncedCron.add({                                                                                                 // 292
					name: ip + '_read sensors',                                                                                     // 293
					schedule: function (parser) {                                                                                   // 294
						return parser.recur().every(Sensori.findOne({                                                                  // 294
							ip: ip                                                                                                        // 294
						}).timescheduler).second();                                                                                    // 294
					},                                                                                                              // 294
					job: function () {                                                                                              // 295
						cron_read_sensor(ip);                                                                                          // 295
						return ip + '_read sensors';                                                                                   // 295
					}                                                                                                               // 295
				});                                                                                                              // 292
			}                                                                                                                 // 297
		}                                                                                                                  // 298
	});                                                                                                                 // 274
                                                                                                                     // 274
	function cron_watt_after(now, response) {                                                                           // 302
		var today = moment().format("YYYYMMDD");                                                                           // 303
		var matrix = [];                                                                                                   // 304
		var csvfs = '';                                                                                                    // 304
		var solararr = [];                                                                                                 // 304
                                                                                                                     // 304
		if (Raspberry) {                                                                                                   // 305
			csvfs = csvpath + today + ".csv";                                                                                 // 305
		} else {                                                                                                           // 305
			csvfs = csvpathwin;                                                                                               // 305
		} // Leggo immediatamente i valori de sensore per garantire il timeframe dei 5 minuti 		                           // 305
                                                                                                                     // 307
                                                                                                                     // 307
		if (fs.existsSync(csvfs)) {                                                                                        // 308
			matrix = fs.readFileSync(csvfs).toString().split("\n").map(function (row) {                                       // 309
				return {                                                                                                         // 309
					x: moment(today + " " + row.split(",")[0], "YYYYMMDD HH:mm").unix(),                                            // 309
					y: Number(row.split(",")[27])                                                                                   // 309
				};                                                                                                               // 309
			}).slice(1, -1);                                                                                                  // 309
			solararr = solar(matrix); //console.log('solarray',solarray);                                                     // 310
                                                                                                                     // 311
			Watt.update({                                                                                                     // 312
				day: today                                                                                                       // 312
			}, {                                                                                                              // 312
				$set: {                                                                                                          // 312
					solararr: solararr                                                                                              // 312
				}                                                                                                                // 312
			}, {                                                                                                              // 312
				upsert: true,                                                                                                    // 312
				multi: false                                                                                                     // 312
			});                                                                                                               // 312
		} else {                                                                                                           // 313
			console.log('File not found: ', csvfs);                                                                           // 313
		}                                                                                                                  // 313
                                                                                                                     // 313
		if (response.data !== null) {                                                                                      // 315
			var pulsearr = pulse(today, now, response.data.Sensors[0].Total, solararr); //	console.log('pulserray',pulsearr);      
                                                                                                                     // 317
			Watt.update({                                                                                                     // 318
				day: today                                                                                                       // 318
			}, {                                                                                                              // 318
				$set: {                                                                                                          // 318
					pulsearr: pulsearr                                                                                              // 318
				}                                                                                                                // 318
			}, {                                                                                                              // 318
				upsert: true,                                                                                                    // 318
				multi: false                                                                                                     // 318
			});                                                                                                               // 318
		} else {// console.log('Warning cron_watt (problem reading sensor):',today,' - ',response);                        // 319
		}                                                                                                                  // 321
	}                                                                                                                   // 322
                                                                                                                     // 322
	function pulse(date, now, ytmp, solararr) {                                                                         // 325
		var b = [];                                                                                                        // 326
		var x0 = 0;                                                                                                        // 326
		var y0 = 0;                                                                                                        // 326
		var e = Watt.findOne({                                                                                             // 326
			day: date                                                                                                         // 326
		});                                                                                                                // 326
		var sx = 0;                                                                                                        // 326
		var sy = 0;                                                                                                        // 326
		console.log('solararr.length', solararr.length);                                                                   // 327
                                                                                                                     // 327
		if (solararr.length > 0) {                                                                                         // 329
			sx = solararr[solararr.length - 1].x;                                                                             // 329
			sy = solararr[solararr.length - 1].y;                                                                             // 329
		}                                                                                                                  // 329
                                                                                                                     // 329
		if (e && e.pulsearr) {                                                                                             // 330
			e.pulsearr.push({                                                                                                 // 331
				x: now,                                                                                                          // 331
				y: 0,                                                                                                            // 331
				ytmp: ytmp                                                                                                       // 331
			});                                                                                                               // 331
			e.pulsearr.forEach(function (p) {                                                                                 // 332
				var x1 = p.x;                                                                                                    // 333
				var y1 = p.ytmp;                                                                                                 // 333
				var deltat = (x1 - x0) / 1000;                                                                                   // 333
                                                                                                                     // 333
				if (deltat <= 0 || y1 < y0) {                                                                                    // 334
					console.log('!!!  y1:', y1, 'y0:', y0, 'x1:', x1, 'x0:', x0);                                                   // 334
				}                                                                                                                // 334
                                                                                                                     // 334
				;                                                                                                                // 334
                                                                                                                     // 334
				if (deltat > 0 && y1 - y0 >= 0) {                                                                                // 336
					var y = Math.round((y1 - y0) * 3600 / deltat, 3);                                                               // 337
                                                                                                                     // 337
					if (now === sx) {                                                                                               // 338
						if (sy >= y) {                                                                                                 // 338
							y = sy + y;                                                                                                   // 338
						} else {                                                                                                       // 338
							y = sy - y;                                                                                                   // 338
						}                                                                                                              // 338
					}                                                                                                               // 338
                                                                                                                     // 338
					console.log('now', now, 'sx', sx, 'sy', sy, 'y', y, 'y1', y1, 'y0', y0);                                        // 339
					b.push({                                                                                                        // 340
						x: x1,                                                                                                         // 340
						y: y,                                                                                                          // 340
						ytmp: y1                                                                                                       // 340
					});                                                                                                             // 340
				} else {                                                                                                         // 341
					console.log('Warning (pulse) deltat or (y1-y0):', deltat, '|', y1 - y0);                                        // 341
				}                                                                                                                // 341
                                                                                                                     // 341
				x0 = x1;                                                                                                         // 342
				y0 = y1;                                                                                                         // 342
			});                                                                                                               // 343
		} else {                                                                                                           // 344
			b.push({                                                                                                          // 344
				x: now,                                                                                                          // 344
				y: 0,                                                                                                            // 344
				ytmp: ytmp                                                                                                       // 344
			});                                                                                                               // 344
			console.log('First entry for pulsearr:', now);                                                                    // 344
		}                                                                                                                  // 344
                                                                                                                     // 344
		return b;                                                                                                          // 345
	}                                                                                                                   // 346
                                                                                                                     // 346
	function solar(matrix) {                                                                                            // 349
		var b = [];                                                                                                        // 350
		var x0 = 0;                                                                                                        // 350
		var y0 = 0;                                                                                                        // 350
                                                                                                                     // 350
		if (matrix) {                                                                                                      // 351
			matrix.forEach(function (s) {                                                                                     // 352
				var x1 = s.x;                                                                                                    // 353
				var y1 = s.y;                                                                                                    // 353
				var deltat = x1 - x0;                                                                                            // 353
                                                                                                                     // 353
				if (deltat > 0) {                                                                                                // 354
					var KwFull = Math.round((y1 - y0) * 3600 / deltat * 1000, 3); //console.log('solar:',{x: x1*1000, y: KwFull });
                                                                                                                     // 356
					b.push({                                                                                                        // 357
						x: x1 * 1000,                                                                                                  // 357
						y: KwFull                                                                                                      // 357
					});                                                                                                             // 357
				} else {//  console.log('Warning (solar) deltat:', deltat);                                                      // 358
				}                                                                                                                // 360
                                                                                                                     // 360
				x0 = x1;                                                                                                         // 361
				y0 = y1;                                                                                                         // 361
			});                                                                                                               // 362
		} else {                                                                                                           // 363
			console.log('No found MATRIX');                                                                                   // 363
		}                                                                                                                  // 363
                                                                                                                     // 363
		return b;                                                                                                          // 364
	}                                                                                                                   // 365
                                                                                                                     // 365
	function cron_watt() {                                                                                              // 368
		var now = Math.floor(moment().unix());                                                                             // 369
		var ip = Sensori.findOne({                                                                                         // 370
			tipo: 'pulse'                                                                                                     // 370
		}).ip; // Leggo immediatamente i valori del sensore per garantire il timeframe dei 5 minuti                        // 370
                                                                                                                     // 371
		var response = HTTP.get("http://" + ip + "/json", {});                                                             // 372
		setTimeout(cron_watt_after(now * 1000, response), 10000);                                                          // 373
	}                                                                                                                   // 374
                                                                                                                     // 374
	var watt = SyncedCron.add({                                                                                         // 377
		name: 'watt',                                                                                                      // 378
		schedule: function (parser) {                                                                                      // 379
			return parser.recur().every(5).minute();                                                                          // 379
		},                                                                                                                 // 379
		//schedule: function(parser) {return parser.recur().every(20).second();},                                          // 380
		job: cron_watt                                                                                                     // 381
	});                                                                                                                 // 377
	SyncedCron.config({                                                                                                 // 386
		log: false                                                                                                         // 386
	});                                                                                                                 // 386
	SyncedCron.start();                                                                                                 // 388
});                                                                                                                  // 390
Meteor.methods({                                                                                                     // 392
	"createUserAccount": function (options) {                                                                           // 393
		if (!Users.isAdmin(Meteor.userId())) {                                                                             // 394
			throw new Meteor.Error(403, "Access denied.");                                                                    // 395
		}                                                                                                                  // 396
                                                                                                                     // 396
		var userOptions = {};                                                                                              // 398
		if (options.username) userOptions.username = options.username;                                                     // 399
		if (options.email) userOptions.email = options.email;                                                              // 400
		if (options.password) userOptions.password = options.password;                                                     // 401
		if (options.profile) userOptions.profile = options.profile;                                                        // 402
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;                           // 403
		Accounts.createUser(userOptions);                                                                                  // 405
	},                                                                                                                  // 406
	"updateUserAccount": function (userId, options) {                                                                   // 407
		// only admin or users own profile                                                                                 // 408
		if (!(Users.isAdmin(Meteor.userId()) || userId == Meteor.userId())) {                                              // 409
			throw new Meteor.Error(403, "Access denied.");                                                                    // 410
		} // non-admin user can change only profile                                                                        // 411
                                                                                                                     // 413
                                                                                                                     // 413
		if (!Users.isAdmin(Meteor.userId())) {                                                                             // 414
			var keys = Object.keys(options);                                                                                  // 415
                                                                                                                     // 415
			if (keys.length !== 1 || !options.profile) {                                                                      // 416
				throw new Meteor.Error(403, "Access denied.");                                                                   // 417
			}                                                                                                                 // 418
		}                                                                                                                  // 419
                                                                                                                     // 419
		var userOptions = {};                                                                                              // 421
		if (options.username) userOptions.username = options.username;                                                     // 422
		if (options.email) userOptions.email = options.email;                                                              // 423
		if (options.password) userOptions.password = options.password;                                                     // 424
		if (options.profile) userOptions.profile = options.profile;                                                        // 425
		if (options.profile && options.profile.email) userOptions.email = options.profile.email;                           // 427
		if (options.roles) userOptions.roles = options.roles;                                                              // 428
                                                                                                                     // 428
		if (userOptions.email) {                                                                                           // 430
			var email = userOptions.email;                                                                                    // 431
			delete userOptions.email;                                                                                         // 432
			var userData = Users.findOne(this.userId);                                                                        // 433
                                                                                                                     // 433
			if (userData.emails && !userData.emails.find(function (mail) {                                                    // 434
				return mail.address == email;                                                                                    // 434
			})) {                                                                                                             // 434
				userOptions.emails = [{                                                                                          // 435
					address: email                                                                                                  // 435
				}];                                                                                                              // 435
			}                                                                                                                 // 436
		}                                                                                                                  // 437
                                                                                                                     // 437
		var password = "";                                                                                                 // 439
                                                                                                                     // 439
		if (userOptions.password) {                                                                                        // 440
			password = userOptions.password;                                                                                  // 441
			delete userOptions.password;                                                                                      // 442
		}                                                                                                                  // 443
                                                                                                                     // 443
		if (userOptions) {                                                                                                 // 445
			for (var key in meteorBabelHelpers.sanitizeForInObject(userOptions)) {                                            // 446
				var obj = userOptions[key];                                                                                      // 447
                                                                                                                     // 447
				if (_.isObject(obj)) {                                                                                           // 448
					for (var k in meteorBabelHelpers.sanitizeForInObject(obj)) {                                                    // 449
						userOptions[key + "." + k] = obj[k];                                                                           // 450
					}                                                                                                               // 451
                                                                                                                     // 451
					delete userOptions[key];                                                                                        // 452
				}                                                                                                                // 453
			}                                                                                                                 // 454
                                                                                                                     // 454
			Users.update(userId, {                                                                                            // 455
				$set: userOptions                                                                                                // 455
			});                                                                                                               // 455
		}                                                                                                                  // 456
                                                                                                                     // 456
		if (password) {                                                                                                    // 458
			Accounts.setPassword(userId, password);                                                                           // 459
		}                                                                                                                  // 460
	},                                                                                                                  // 461
	"sendMail": function (options) {                                                                                    // 463
		this.unblock();                                                                                                    // 464
		Email.send(options);                                                                                               // 466
	}                                                                                                                   // 467
});                                                                                                                  // 392
Accounts.onCreateUser(function (options, user) {                                                                     // 470
	user.roles = ["user"];                                                                                              // 471
                                                                                                                     // 471
	if (options.profile) {                                                                                              // 473
		user.profile = options.profile;                                                                                    // 474
	}                                                                                                                   // 475
                                                                                                                     // 475
	if (!Users.findOne({                                                                                                // 477
		roles: "admin"                                                                                                     // 477
	}) && user.roles.indexOf("admin") < 0) {                                                                            // 477
		user.roles = ["admin"];                                                                                            // 478
	}                                                                                                                   // 479
                                                                                                                     // 479
	return user;                                                                                                        // 481
});                                                                                                                  // 482
Accounts.validateLoginAttempt(function (info) {                                                                      // 484
	// reject users with role "blocked"                                                                                 // 486
	if (info.user && Users.isInRole(info.user._id, "blocked")) {                                                        // 487
		throw new Meteor.Error(403, "Your account is blocked.");                                                           // 488
	}                                                                                                                   // 489
                                                                                                                     // 489
	if (verifyEmail && info.user && info.user.emails && info.user.emails.length && !info.user.emails[0].verified) {     // 491
		throw new Meteor.Error(499, "E-mail not verified.");                                                               // 492
	}                                                                                                                   // 493
                                                                                                                     // 493
	return true;                                                                                                        // 495
});                                                                                                                  // 496
Users.before.insert(function (userId, doc) {                                                                         // 499
	if (doc.emails && doc.emails[0] && doc.emails[0].address) {                                                         // 500
		doc.profile = doc.profile || {};                                                                                   // 501
		doc.profile.email = doc.emails[0].address;                                                                         // 502
	} else {                                                                                                            // 503
		// oauth                                                                                                           // 504
		if (doc.services) {                                                                                                // 505
			// google e-mail                                                                                                  // 506
			if (doc.services.google && doc.services.google.email) {                                                           // 507
				doc.profile = doc.profile || {};                                                                                 // 508
				doc.profile.email = doc.services.google.email;                                                                   // 509
			} else {                                                                                                          // 510
				// github e-mail                                                                                                 // 511
				if (doc.services.github && doc.services.github.accessToken) {                                                    // 512
					var github = new GitHub({                                                                                       // 513
						version: "3.0.0",                                                                                              // 514
						timeout: 5000                                                                                                  // 515
					});                                                                                                             // 513
					github.authenticate({                                                                                           // 518
						type: "oauth",                                                                                                 // 519
						token: doc.services.github.accessToken                                                                         // 520
					});                                                                                                             // 518
                                                                                                                     // 518
					try {                                                                                                           // 523
						var result = github.user.getEmails({});                                                                        // 524
                                                                                                                     // 524
						var email = _.findWhere(result, {                                                                              // 525
							primary: true                                                                                                 // 525
						});                                                                                                            // 525
                                                                                                                     // 525
						if (!email && result.length && _.isString(result[0])) {                                                        // 526
							email = {                                                                                                     // 527
								email: result[0]                                                                                             // 527
							};                                                                                                            // 527
						}                                                                                                              // 528
                                                                                                                     // 528
						if (email) {                                                                                                   // 530
							doc.profile = doc.profile || {};                                                                              // 531
							doc.profile.email = email.email;                                                                              // 532
						}                                                                                                              // 533
					} catch (e) {                                                                                                   // 534
						console.log(e);                                                                                                // 535
					}                                                                                                               // 536
				} else {                                                                                                         // 537
					// linkedin email                                                                                               // 538
					if (doc.services.linkedin && doc.services.linkedin.emailAddress) {                                              // 539
						doc.profile = doc.profile || {};                                                                               // 540
						doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;                     // 541
						doc.profile.email = doc.services.linkedin.emailAddress;                                                        // 542
					} else {                                                                                                        // 543
						if (doc.services.facebook && doc.services.facebook.email) {                                                    // 544
							doc.profile = doc.profile || {};                                                                              // 545
							doc.profile.email = doc.services.facebook.email;                                                              // 546
						} else {                                                                                                       // 547
							if (doc.services.twitter && doc.services.twitter.email) {                                                     // 548
								doc.profile = doc.profile || {};                                                                             // 549
								doc.profile.email = doc.services.twitter.email;                                                              // 550
							} else {                                                                                                      // 551
								if (doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
									doc.profile = doc.profile || {};                                                                            // 553
									doc.profile.email = doc.services["meteor-developer"].emails[0].address;                                     // 554
								}                                                                                                            // 555
							}                                                                                                             // 556
						}                                                                                                              // 557
					}                                                                                                               // 558
				}                                                                                                                // 559
			}                                                                                                                 // 560
		}                                                                                                                  // 561
	}                                                                                                                   // 562
});                                                                                                                  // 563
Users.before.update(function (userId, doc, fieldNames, modifier, options) {                                          // 565
	if (modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {      // 566
		modifier.$set.profile.email = modifier.$set.emails[0].address;                                                     // 567
	}                                                                                                                   // 568
});                                                                                                                  // 569
Accounts.onLogin(function (info) {});                                                                                // 571
                                                                                                                     // 571
Accounts.urls.resetPassword = function (token) {                                                                     // 575
	return Meteor.absoluteUrl('reset_password/' + token);                                                               // 576
};                                                                                                                   // 577
                                                                                                                     // 575
Accounts.urls.verifyEmail = function (token) {                                                                       // 579
	return Meteor.absoluteUrl('verify_email/' + token);                                                                 // 580
};                                                                                                                   // 581
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./lib/case_utils.js");
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
