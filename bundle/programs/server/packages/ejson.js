(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Base64 = Package.base64.Base64;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var v, EJSON;

var require = meteorInstall({"node_modules":{"meteor":{"ejson":{"ejson.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ejson/ejson.js                                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                             //
                                                                                                                    //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                    //
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                   //
                                                                                                                    //
module.export({                                                                                                     // 1
  EJSON: function () {                                                                                              // 1
    return EJSON;                                                                                                   // 1
  }                                                                                                                 // 1
});                                                                                                                 // 1
/**                                                                                                                 // 1
 * @namespace                                                                                                       // 1
 * @summary Namespace for EJSON functions                                                                           // 1
 */var EJSON = {}; // Custom type interface definition                                                              // 1
/**                                                                                                                 // 8
 * @class CustomType                                                                                                // 8
 * @instanceName customType                                                                                         // 8
 * @memberOf EJSON                                                                                                  // 8
 * @summary The interface that a class must satisfy to be able to become an                                         // 8
 * EJSON custom type via EJSON.addType.                                                                             // 8
 */ /**                                                                                                             // 8
     * @function typeName                                                                                           // 16
     * @memberOf EJSON.CustomType                                                                                   // 16
     * @summary Return the tag used to identify this type.  This must match the                                     // 16
     *          tag used to register this type with                                                                 // 16
     *          [`EJSON.addType`](#ejson_add_type).                                                                 // 16
     * @locus Anywhere                                                                                              // 16
     * @instance                                                                                                    // 16
     */ /**                                                                                                         // 16
         * @function toJSONValue                                                                                    // 26
         * @memberOf EJSON.CustomType                                                                               // 26
         * @summary Serialize this instance into a JSON-compatible value.                                           // 26
         * @locus Anywhere                                                                                          // 26
         * @instance                                                                                                // 26
         */ /**                                                                                                     // 26
             * @function clone                                                                                      // 34
             * @memberOf EJSON.CustomType                                                                           // 34
             * @summary Return a value `r` such that `this.equals(r)` is true, and                                  // 34
             *          modifications to `r` do not affect `this` and vice versa.                                   // 34
             * @locus Anywhere                                                                                      // 34
             * @instance                                                                                            // 34
             */ /**                                                                                                 // 34
                 * @function equals                                                                                 // 43
                 * @memberOf EJSON.CustomType                                                                       // 43
                 * @summary Return `true` if `other` has a value equal to `this`; `false`                           // 43
                 *          otherwise.                                                                              // 43
                 * @locus Anywhere                                                                                  // 43
                 * @param {Object} other Another object to compare this to.                                         // 43
                 * @instance                                                                                        // 43
                 */                                                                                                 // 43
var customTypes = {};                                                                                               // 53
                                                                                                                    // 53
var hasOwn = function (obj, prop) {                                                                                 // 55
  return {}.hasOwnProperty.call(obj, prop);                                                                         // 55
};                                                                                                                  // 55
                                                                                                                    // 55
var isArguments = function (obj) {                                                                                  // 57
  return obj != null && hasOwn(obj, 'callee');                                                                      // 57
};                                                                                                                  // 57
                                                                                                                    // 57
var isInfOrNan = function (obj) {                                                                                   // 59
  return Number.isNaN(obj) || obj === Infinity || obj === -Infinity;                                                // 60
}; // Add a custom type, using a method of your choice to get to and                                                // 60
// from a basic JSON-able representation.  The factory argument                                                     // 63
// is a function of JSON-able --> your object                                                                       // 64
// The type you add must have:                                                                                      // 65
// - A toJSONValue() method, so that Meteor can serialize it                                                        // 66
// - a typeName() method, to show how to look it up in our type table.                                              // 67
// It is okay if these methods are monkey-patched on.                                                               // 68
// EJSON.clone will use toJSONValue and the given factory to produce                                                // 69
// a clone, but you may specify a method clone() that will be                                                       // 70
// used instead.                                                                                                    // 71
// Similarly, EJSON.equals will use toJSONValue to make comparisons,                                                // 72
// but you may provide a method equals() instead.                                                                   // 73
/**                                                                                                                 // 74
 * @summary Add a custom datatype to EJSON.                                                                         // 74
 * @locus Anywhere                                                                                                  // 74
 * @param {String} name A tag for your custom type; must be unique among                                            // 74
 *                      custom data types defined in your project, and must                                         // 74
 *                      match the result of your type's `typeName` method.                                          // 74
 * @param {Function} factory A function that deserializes a JSON-compatible                                         // 74
 *                           value into an instance of your type.  This should                                      // 74
 *                           match the serialization performed by your                                              // 74
 *                           type's `toJSONValue` method.                                                           // 74
 */                                                                                                                 // 74
                                                                                                                    // 74
EJSON.addType = function (name, factory) {                                                                          // 85
  if (hasOwn(customTypes, name)) {                                                                                  // 86
    throw new Error("Type " + name + " already present");                                                           // 87
  }                                                                                                                 // 88
                                                                                                                    // 88
  customTypes[name] = factory;                                                                                      // 89
};                                                                                                                  // 90
                                                                                                                    // 85
var builtinConverters = [{                                                                                          // 92
  // Date                                                                                                           // 93
  matchJSONValue: function (obj) {                                                                                  // 94
    return hasOwn(obj, '$date') && Object.keys(obj).length === 1;                                                   // 95
  },                                                                                                                // 96
  matchObject: function (obj) {                                                                                     // 97
    return obj instanceof Date;                                                                                     // 98
  },                                                                                                                // 99
  toJSONValue: function (obj) {                                                                                     // 100
    return {                                                                                                        // 101
      $date: obj.getTime()                                                                                          // 101
    };                                                                                                              // 101
  },                                                                                                                // 102
  fromJSONValue: function (obj) {                                                                                   // 103
    return new Date(obj.$date);                                                                                     // 104
  }                                                                                                                 // 105
}, {                                                                                                                // 93
  // RegExp                                                                                                         // 107
  matchJSONValue: function (obj) {                                                                                  // 108
    return hasOwn(obj, '$regexp') && hasOwn(obj, '$flags') && Object.keys(obj).length === 2;                        // 109
  },                                                                                                                // 112
  matchObject: function (obj) {                                                                                     // 113
    return obj instanceof RegExp;                                                                                   // 114
  },                                                                                                                // 115
  toJSONValue: function (regexp) {                                                                                  // 116
    return {                                                                                                        // 117
      $regexp: regexp.source,                                                                                       // 118
      $flags: regexp.flags                                                                                          // 119
    };                                                                                                              // 117
  },                                                                                                                // 121
  fromJSONValue: function (obj) {                                                                                   // 122
    // Replaces duplicate / invalid flags.                                                                          // 123
    return new RegExp(obj.$regexp, obj.$flags // Cut off flags at 50 chars to avoid abusing RegExp for DOS.         // 124
    .slice(0, 50).replace(/[^gimuy]/g, '').replace(/(.)(?=.*\1)/g, ''));                                            // 126
  }                                                                                                                 // 132
}, {                                                                                                                // 107
  // NaN, Inf, -Inf. (These are the only objects with typeof !== 'object'                                           // 134
  // which we match.)                                                                                               // 135
  matchJSONValue: function (obj) {                                                                                  // 136
    return hasOwn(obj, '$InfNaN') && Object.keys(obj).length === 1;                                                 // 137
  },                                                                                                                // 138
  matchObject: isInfOrNan,                                                                                          // 139
  toJSONValue: function (obj) {                                                                                     // 140
    var sign = void 0;                                                                                              // 141
                                                                                                                    // 141
    if (Number.isNaN(obj)) {                                                                                        // 142
      sign = 0;                                                                                                     // 143
    } else if (obj === Infinity) {                                                                                  // 144
      sign = 1;                                                                                                     // 145
    } else {                                                                                                        // 146
      sign = -1;                                                                                                    // 147
    }                                                                                                               // 148
                                                                                                                    // 148
    return {                                                                                                        // 149
      $InfNaN: sign                                                                                                 // 149
    };                                                                                                              // 149
  },                                                                                                                // 150
  fromJSONValue: function (obj) {                                                                                   // 151
    return obj.$InfNaN / 0;                                                                                         // 152
  }                                                                                                                 // 153
}, {                                                                                                                // 134
  // Binary                                                                                                         // 155
  matchJSONValue: function (obj) {                                                                                  // 156
    return hasOwn(obj, '$binary') && Object.keys(obj).length === 1;                                                 // 157
  },                                                                                                                // 158
  matchObject: function (obj) {                                                                                     // 159
    return typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && hasOwn(obj, '$Uint8ArrayPolyfill');
  },                                                                                                                // 162
  toJSONValue: function (obj) {                                                                                     // 163
    return {                                                                                                        // 164
      $binary: Base64.encode(obj)                                                                                   // 164
    };                                                                                                              // 164
  },                                                                                                                // 165
  fromJSONValue: function (obj) {                                                                                   // 166
    return Base64.decode(obj.$binary);                                                                              // 167
  }                                                                                                                 // 168
}, {                                                                                                                // 155
  // Escaping one level                                                                                             // 170
  matchJSONValue: function (obj) {                                                                                  // 171
    return hasOwn(obj, '$escape') && Object.keys(obj).length === 1;                                                 // 172
  },                                                                                                                // 173
  matchObject: function (obj) {                                                                                     // 174
    var match = false;                                                                                              // 175
                                                                                                                    // 175
    if (obj) {                                                                                                      // 176
      var keyCount = Object.keys(obj).length;                                                                       // 177
                                                                                                                    // 177
      if (keyCount === 1 || keyCount === 2) {                                                                       // 178
        match = builtinConverters.some(function (converter) {                                                       // 179
          return converter.matchJSONValue(obj);                                                                     // 180
        });                                                                                                         // 180
      }                                                                                                             // 181
    }                                                                                                               // 182
                                                                                                                    // 182
    return match;                                                                                                   // 183
  },                                                                                                                // 184
  toJSONValue: function (obj) {                                                                                     // 185
    var newObj = {};                                                                                                // 186
    Object.keys(obj).forEach(function (key) {                                                                       // 187
      newObj[key] = EJSON.toJSONValue(obj[key]);                                                                    // 188
    });                                                                                                             // 189
    return {                                                                                                        // 190
      $escape: newObj                                                                                               // 190
    };                                                                                                              // 190
  },                                                                                                                // 191
  fromJSONValue: function (obj) {                                                                                   // 192
    var newObj = {};                                                                                                // 193
    Object.keys(obj.$escape).forEach(function (key) {                                                               // 194
      newObj[key] = EJSON.fromJSONValue(obj.$escape[key]);                                                          // 195
    });                                                                                                             // 196
    return newObj;                                                                                                  // 197
  }                                                                                                                 // 198
}, {                                                                                                                // 170
  // Custom                                                                                                         // 200
  matchJSONValue: function (obj) {                                                                                  // 201
    return hasOwn(obj, '$type') && hasOwn(obj, '$value') && Object.keys(obj).length === 2;                          // 202
  },                                                                                                                // 204
  matchObject: function (obj) {                                                                                     // 205
    return EJSON._isCustomType(obj);                                                                                // 206
  },                                                                                                                // 207
  toJSONValue: function (obj) {                                                                                     // 208
    var jsonValue = Meteor._noYieldsAllowed(function () {                                                           // 209
      return obj.toJSONValue();                                                                                     // 209
    });                                                                                                             // 209
                                                                                                                    // 209
    return {                                                                                                        // 210
      $type: obj.typeName(),                                                                                        // 210
      $value: jsonValue                                                                                             // 210
    };                                                                                                              // 210
  },                                                                                                                // 211
  fromJSONValue: function (obj) {                                                                                   // 212
    var typeName = obj.$type;                                                                                       // 213
                                                                                                                    // 213
    if (!hasOwn(customTypes, typeName)) {                                                                           // 214
      throw new Error("Custom EJSON type " + typeName + " is not defined");                                         // 215
    }                                                                                                               // 216
                                                                                                                    // 216
    var converter = customTypes[typeName];                                                                          // 217
    return Meteor._noYieldsAllowed(function () {                                                                    // 218
      return converter(obj.$value);                                                                                 // 218
    });                                                                                                             // 218
  }                                                                                                                 // 219
}];                                                                                                                 // 200
                                                                                                                    // 92
EJSON._isCustomType = function (obj) {                                                                              // 223
  return obj && typeof obj.toJSONValue === 'function' && typeof obj.typeName === 'function' && hasOwn(customTypes, obj.typeName());
};                                                                                                                  // 223
                                                                                                                    // 223
EJSON._getTypes = function () {                                                                                     // 230
  return customTypes;                                                                                               // 230
};                                                                                                                  // 230
                                                                                                                    // 230
EJSON._getConverters = function () {                                                                                // 232
  return builtinConverters;                                                                                         // 232
}; // Either return the JSON-compatible version of the argument, or undefined (if                                   // 232
// the item isn't itself replaceable, but maybe some fields in it are)                                              // 235
                                                                                                                    // 235
                                                                                                                    // 235
var toJSONValueHelper = function (item) {                                                                           // 236
  for (var i = 0; i < builtinConverters.length; i++) {                                                              // 237
    var converter = builtinConverters[i];                                                                           // 238
                                                                                                                    // 238
    if (converter.matchObject(item)) {                                                                              // 239
      return converter.toJSONValue(item);                                                                           // 240
    }                                                                                                               // 241
  }                                                                                                                 // 242
                                                                                                                    // 242
  return undefined;                                                                                                 // 243
}; // for both arrays and objects, in-place modification.                                                           // 244
                                                                                                                    // 246
                                                                                                                    // 246
var adjustTypesToJSONValue = function (obj) {                                                                       // 247
  // Is it an atom that we need to adjust?                                                                          // 248
  if (obj === null) {                                                                                               // 249
    return null;                                                                                                    // 250
  }                                                                                                                 // 251
                                                                                                                    // 251
  var maybeChanged = toJSONValueHelper(obj);                                                                        // 253
                                                                                                                    // 253
  if (maybeChanged !== undefined) {                                                                                 // 254
    return maybeChanged;                                                                                            // 255
  } // Other atoms are unchanged.                                                                                   // 256
                                                                                                                    // 258
                                                                                                                    // 258
  if ((typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) !== 'object') {                       // 259
    return obj;                                                                                                     // 260
  } // Iterate over array or object structure.                                                                      // 261
                                                                                                                    // 263
                                                                                                                    // 263
  Object.keys(obj).forEach(function (key) {                                                                         // 264
    var value = obj[key];                                                                                           // 265
                                                                                                                    // 265
    if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) !== 'object' && value !== undefined && !isInfOrNan(value)) {
      return; // continue                                                                                           // 268
    }                                                                                                               // 269
                                                                                                                    // 269
    var changed = toJSONValueHelper(value);                                                                         // 271
                                                                                                                    // 271
    if (changed) {                                                                                                  // 272
      obj[key] = changed;                                                                                           // 273
      return; // on to the next key                                                                                 // 274
    } // if we get here, value is an object but not adjustable                                                      // 275
    // at this level.  recurse.                                                                                     // 277
                                                                                                                    // 277
                                                                                                                    // 277
    adjustTypesToJSONValue(value);                                                                                  // 278
  });                                                                                                               // 279
  return obj;                                                                                                       // 280
};                                                                                                                  // 281
                                                                                                                    // 247
EJSON._adjustTypesToJSONValue = adjustTypesToJSONValue; /**                                                         // 283
                                                         * @summary Serialize an EJSON-compatible value into its plain JSON
                                                         *          representation.                                 // 285
                                                         * @locus Anywhere                                          // 285
                                                         * @param {EJSON} val A value to serialize to plain JSON.   // 285
                                                         */                                                         // 285
                                                                                                                    // 285
EJSON.toJSONValue = function (item) {                                                                               // 291
  var changed = toJSONValueHelper(item);                                                                            // 292
                                                                                                                    // 292
  if (changed !== undefined) {                                                                                      // 293
    return changed;                                                                                                 // 294
  }                                                                                                                 // 295
                                                                                                                    // 295
  var newItem = item;                                                                                               // 297
                                                                                                                    // 297
  if ((typeof item === "undefined" ? "undefined" : (0, _typeof3.default)(item)) === 'object') {                     // 298
    newItem = EJSON.clone(item);                                                                                    // 299
    adjustTypesToJSONValue(newItem);                                                                                // 300
  }                                                                                                                 // 301
                                                                                                                    // 301
  return newItem;                                                                                                   // 302
}; // Either return the argument changed to have the non-json                                                       // 303
// rep of itself (the Object version) or the argument itself.                                                       // 306
// DOES NOT RECURSE.  For actually getting the fully-changed value, use                                             // 307
// EJSON.fromJSONValue                                                                                              // 308
                                                                                                                    // 308
                                                                                                                    // 308
var fromJSONValueHelper = function (value) {                                                                        // 309
  if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === 'object' && value !== null) {
    var keys = Object.keys(value);                                                                                  // 311
                                                                                                                    // 311
    if (keys.length <= 2 && keys.every(function (k) {                                                               // 312
      return typeof k === 'string' && k.substr(0, 1) === '$';                                                       // 313
    })) {                                                                                                           // 313
      for (var i = 0; i < builtinConverters.length; i++) {                                                          // 314
        var converter = builtinConverters[i];                                                                       // 315
                                                                                                                    // 315
        if (converter.matchJSONValue(value)) {                                                                      // 316
          return converter.fromJSONValue(value);                                                                    // 317
        }                                                                                                           // 318
      }                                                                                                             // 319
    }                                                                                                               // 320
  }                                                                                                                 // 321
                                                                                                                    // 321
  return value;                                                                                                     // 322
}; // for both arrays and objects. Tries its best to just                                                           // 323
// use the object you hand it, but may return something                                                             // 326
// different if the object you hand it itself needs changing.                                                       // 327
                                                                                                                    // 327
                                                                                                                    // 327
var adjustTypesFromJSONValue = function (obj) {                                                                     // 328
  if (obj === null) {                                                                                               // 329
    return null;                                                                                                    // 330
  }                                                                                                                 // 331
                                                                                                                    // 331
  var maybeChanged = fromJSONValueHelper(obj);                                                                      // 333
                                                                                                                    // 333
  if (maybeChanged !== obj) {                                                                                       // 334
    return maybeChanged;                                                                                            // 335
  } // Other atoms are unchanged.                                                                                   // 336
                                                                                                                    // 338
                                                                                                                    // 338
  if ((typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) !== 'object') {                       // 339
    return obj;                                                                                                     // 340
  }                                                                                                                 // 341
                                                                                                                    // 341
  Object.keys(obj).forEach(function (key) {                                                                         // 343
    var value = obj[key];                                                                                           // 344
                                                                                                                    // 344
    if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) === 'object') {                 // 345
      var changed = fromJSONValueHelper(value);                                                                     // 346
                                                                                                                    // 346
      if (value !== changed) {                                                                                      // 347
        obj[key] = changed;                                                                                         // 348
        return;                                                                                                     // 349
      } // if we get here, value is an object but not adjustable                                                    // 350
      // at this level.  recurse.                                                                                   // 352
                                                                                                                    // 352
                                                                                                                    // 352
      adjustTypesFromJSONValue(value);                                                                              // 353
    }                                                                                                               // 354
  });                                                                                                               // 355
  return obj;                                                                                                       // 356
};                                                                                                                  // 357
                                                                                                                    // 328
EJSON._adjustTypesFromJSONValue = adjustTypesFromJSONValue; /**                                                     // 359
                                                             * @summary Deserialize an EJSON value from its plain JSON representation.
                                                             * @locus Anywhere                                      // 361
                                                             * @param {JSONCompatible} val A value to deserialize into EJSON.
                                                             */                                                     // 361
                                                                                                                    // 361
EJSON.fromJSONValue = function (item) {                                                                             // 366
  var changed = fromJSONValueHelper(item);                                                                          // 367
                                                                                                                    // 367
  if (changed === item && (typeof item === "undefined" ? "undefined" : (0, _typeof3.default)(item)) === 'object') {
    changed = EJSON.clone(item);                                                                                    // 369
    adjustTypesFromJSONValue(changed);                                                                              // 370
  }                                                                                                                 // 371
                                                                                                                    // 371
  return changed;                                                                                                   // 372
}; /**                                                                                                              // 373
    * @summary Serialize a value to a string. For EJSON values, the serialization                                   // 375
    *          fully represents the value. For non-EJSON values, serializes the                                     // 375
    *          same way as `JSON.stringify`.                                                                        // 375
    * @locus Anywhere                                                                                               // 375
    * @param {EJSON} val A value to stringify.                                                                      // 375
    * @param {Object} [options]                                                                                     // 375
    * @param {Boolean | Integer | String} options.indent Indents objects and                                        // 375
    * arrays for easy readability.  When `true`, indents by 2 spaces; when an                                       // 375
    * integer, indents by that number of spaces; and when a string, uses the                                        // 375
    * string as the indentation pattern.                                                                            // 375
    * @param {Boolean} options.canonical When `true`, stringifies keys in an                                        // 375
    *                                    object in sorted order.                                                    // 375
    */                                                                                                              // 375
                                                                                                                    // 375
EJSON.stringify = function (item, options) {                                                                        // 389
  var serialized = void 0;                                                                                          // 390
  var json = EJSON.toJSONValue(item);                                                                               // 391
                                                                                                                    // 391
  if (options && (options.canonical || options.indent)) {                                                           // 392
    var canonicalStringify = void 0;                                                                                // 1
    module.watch(require("./stringify"), {                                                                          // 1
      "default": function (v) {                                                                                     // 1
        canonicalStringify = v;                                                                                     // 1
      }                                                                                                             // 1
    }, 0);                                                                                                          // 1
    serialized = canonicalStringify(json, options);                                                                 // 394
  } else {                                                                                                          // 395
    serialized = JSON.stringify(json);                                                                              // 396
  }                                                                                                                 // 397
                                                                                                                    // 397
  return serialized;                                                                                                // 398
}; /**                                                                                                              // 399
    * @summary Parse a string into an EJSON value. Throws an error if the string                                    // 401
    *          is not valid EJSON.                                                                                  // 401
    * @locus Anywhere                                                                                               // 401
    * @param {String} str A string to parse into an EJSON value.                                                    // 401
    */                                                                                                              // 401
                                                                                                                    // 401
EJSON.parse = function (item) {                                                                                     // 407
  if (typeof item !== 'string') {                                                                                   // 408
    throw new Error('EJSON.parse argument should be a string');                                                     // 409
  }                                                                                                                 // 410
                                                                                                                    // 410
  return EJSON.fromJSONValue(JSON.parse(item));                                                                     // 411
}; /**                                                                                                              // 412
    * @summary Returns true if `x` is a buffer of binary data, as returned from                                     // 414
    *          [`EJSON.newBinary`](#ejson_new_binary).                                                              // 414
    * @param {Object} x The variable to check.                                                                      // 414
    * @locus Anywhere                                                                                               // 414
    */                                                                                                              // 414
                                                                                                                    // 414
EJSON.isBinary = function (obj) {                                                                                   // 420
  return !!(typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && obj.$Uint8ArrayPolyfill);      // 421
}; /**                                                                                                              // 423
    * @summary Return true if `a` and `b` are equal to each other.  Return false                                    // 425
    *          otherwise.  Uses the `equals` method on `a` if present, otherwise                                    // 425
    *          performs a deep comparison.                                                                          // 425
    * @locus Anywhere                                                                                               // 425
    * @param {EJSON} a                                                                                              // 425
    * @param {EJSON} b                                                                                              // 425
    * @param {Object} [options]                                                                                     // 425
    * @param {Boolean} options.keyOrderSensitive Compare in key sensitive order,                                    // 425
    * if supported by the JavaScript implementation.  For example, `{a: 1, b: 2}`                                   // 425
    * is equal to `{b: 2, a: 1}` only when `keyOrderSensitive` is `false`.  The                                     // 425
    * default is `false`.                                                                                           // 425
    */                                                                                                              // 425
                                                                                                                    // 425
EJSON.equals = function (a, b, options) {                                                                           // 438
  var i = void 0;                                                                                                   // 439
  var keyOrderSensitive = !!(options && options.keyOrderSensitive);                                                 // 440
                                                                                                                    // 440
  if (a === b) {                                                                                                    // 441
    return true;                                                                                                    // 442
  } // This differs from the IEEE spec for NaN equality, b/c we don't want                                          // 443
  // anything ever with a NaN to be poisoned from becoming equal to anything.                                       // 446
                                                                                                                    // 446
                                                                                                                    // 446
  if (Number.isNaN(a) && Number.isNaN(b)) {                                                                         // 447
    return true;                                                                                                    // 448
  } // if either one is falsy, they'd have to be === to be equal                                                    // 449
                                                                                                                    // 451
                                                                                                                    // 451
  if (!a || !b) {                                                                                                   // 452
    return false;                                                                                                   // 453
  }                                                                                                                 // 454
                                                                                                                    // 454
  if (!((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) === 'object' && (typeof b === "undefined" ? "undefined" : (0, _typeof3.default)(b)) === 'object')) {
    return false;                                                                                                   // 457
  }                                                                                                                 // 458
                                                                                                                    // 458
  if (a instanceof Date && b instanceof Date) {                                                                     // 460
    return a.valueOf() === b.valueOf();                                                                             // 461
  }                                                                                                                 // 462
                                                                                                                    // 462
  if (EJSON.isBinary(a) && EJSON.isBinary(b)) {                                                                     // 464
    if (a.length !== b.length) {                                                                                    // 465
      return false;                                                                                                 // 466
    }                                                                                                               // 467
                                                                                                                    // 467
    for (i = 0; i < a.length; i++) {                                                                                // 468
      if (a[i] !== b[i]) {                                                                                          // 469
        return false;                                                                                               // 470
      }                                                                                                             // 471
    }                                                                                                               // 472
                                                                                                                    // 472
    return true;                                                                                                    // 473
  }                                                                                                                 // 474
                                                                                                                    // 474
  if (typeof a.equals === 'function') {                                                                             // 476
    return a.equals(b, options);                                                                                    // 477
  }                                                                                                                 // 478
                                                                                                                    // 478
  if (typeof b.equals === 'function') {                                                                             // 480
    return b.equals(a, options);                                                                                    // 481
  }                                                                                                                 // 482
                                                                                                                    // 482
  if (a instanceof Array) {                                                                                         // 484
    if (!(b instanceof Array)) {                                                                                    // 485
      return false;                                                                                                 // 486
    }                                                                                                               // 487
                                                                                                                    // 487
    if (a.length !== b.length) {                                                                                    // 488
      return false;                                                                                                 // 489
    }                                                                                                               // 490
                                                                                                                    // 490
    for (i = 0; i < a.length; i++) {                                                                                // 491
      if (!EJSON.equals(a[i], b[i], options)) {                                                                     // 492
        return false;                                                                                               // 493
      }                                                                                                             // 494
    }                                                                                                               // 495
                                                                                                                    // 495
    return true;                                                                                                    // 496
  } // fallback for custom types that don't implement their own equals                                              // 497
                                                                                                                    // 499
                                                                                                                    // 499
  switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {                                                        // 500
    case 1:                                                                                                         // 501
      return false;                                                                                                 // 501
                                                                                                                    // 501
    case 2:                                                                                                         // 502
      return EJSON.equals(EJSON.toJSONValue(a), EJSON.toJSONValue(b));                                              // 502
                                                                                                                    // 502
    default: // Do nothing                                                                                          // 503
  } // fall back to structural equality of objects                                                                  // 500
                                                                                                                    // 506
                                                                                                                    // 506
  var ret = void 0;                                                                                                 // 507
  var aKeys = Object.keys(a);                                                                                       // 508
  var bKeys = Object.keys(b);                                                                                       // 509
                                                                                                                    // 509
  if (keyOrderSensitive) {                                                                                          // 510
    i = 0;                                                                                                          // 511
    ret = aKeys.every(function (key) {                                                                              // 512
      if (i >= bKeys.length) {                                                                                      // 513
        return false;                                                                                               // 514
      }                                                                                                             // 515
                                                                                                                    // 515
      if (key !== bKeys[i]) {                                                                                       // 516
        return false;                                                                                               // 517
      }                                                                                                             // 518
                                                                                                                    // 518
      if (!EJSON.equals(a[key], b[bKeys[i]], options)) {                                                            // 519
        return false;                                                                                               // 520
      }                                                                                                             // 521
                                                                                                                    // 521
      i++;                                                                                                          // 522
      return true;                                                                                                  // 523
    });                                                                                                             // 524
  } else {                                                                                                          // 525
    i = 0;                                                                                                          // 526
    ret = aKeys.every(function (key) {                                                                              // 527
      if (!hasOwn(b, key)) {                                                                                        // 528
        return false;                                                                                               // 529
      }                                                                                                             // 530
                                                                                                                    // 530
      if (!EJSON.equals(a[key], b[key], options)) {                                                                 // 531
        return false;                                                                                               // 532
      }                                                                                                             // 533
                                                                                                                    // 533
      i++;                                                                                                          // 534
      return true;                                                                                                  // 535
    });                                                                                                             // 536
  }                                                                                                                 // 537
                                                                                                                    // 537
  return ret && i === bKeys.length;                                                                                 // 538
}; /**                                                                                                              // 539
    * @summary Return a deep copy of `val`.                                                                         // 541
    * @locus Anywhere                                                                                               // 541
    * @param {EJSON} val A value to copy.                                                                           // 541
    */                                                                                                              // 541
                                                                                                                    // 541
EJSON.clone = function (v) {                                                                                        // 546
  var ret = void 0;                                                                                                 // 547
                                                                                                                    // 547
  if ((typeof v === "undefined" ? "undefined" : (0, _typeof3.default)(v)) !== 'object') {                           // 548
    return v;                                                                                                       // 549
  }                                                                                                                 // 550
                                                                                                                    // 550
  if (v === null) {                                                                                                 // 552
    return null; // null has typeof "object"                                                                        // 553
  }                                                                                                                 // 554
                                                                                                                    // 554
  if (v instanceof Date) {                                                                                          // 556
    return new Date(v.getTime());                                                                                   // 557
  } // RegExps are not really EJSON elements (eg we don't define a serialization                                    // 558
  // for them), but they're immutable anyway, so we can support them in clone.                                      // 561
                                                                                                                    // 561
                                                                                                                    // 561
  if (v instanceof RegExp) {                                                                                        // 562
    return v;                                                                                                       // 563
  }                                                                                                                 // 564
                                                                                                                    // 564
  if (EJSON.isBinary(v)) {                                                                                          // 566
    ret = EJSON.newBinary(v.length);                                                                                // 567
                                                                                                                    // 567
    for (var i = 0; i < v.length; i++) {                                                                            // 568
      ret[i] = v[i];                                                                                                // 569
    }                                                                                                               // 570
                                                                                                                    // 570
    return ret;                                                                                                     // 571
  }                                                                                                                 // 572
                                                                                                                    // 572
  if (Array.isArray(v)) {                                                                                           // 574
    return v.map(function (value) {                                                                                 // 575
      return EJSON.clone(value);                                                                                    // 575
    });                                                                                                             // 575
  }                                                                                                                 // 576
                                                                                                                    // 576
  if (isArguments(v)) {                                                                                             // 578
    return Array.from(v).map(function (value) {                                                                     // 579
      return EJSON.clone(value);                                                                                    // 579
    });                                                                                                             // 579
  } // handle general user-defined typed Objects if they have a clone method                                        // 580
                                                                                                                    // 582
                                                                                                                    // 582
  if (typeof v.clone === 'function') {                                                                              // 583
    return v.clone();                                                                                               // 584
  } // handle other custom types                                                                                    // 585
                                                                                                                    // 587
                                                                                                                    // 587
  if (EJSON._isCustomType(v)) {                                                                                     // 588
    return EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(v)), true);                                            // 589
  } // handle other objects                                                                                         // 590
                                                                                                                    // 592
                                                                                                                    // 592
  ret = {};                                                                                                         // 593
  Object.keys(v).forEach(function (key) {                                                                           // 594
    ret[key] = EJSON.clone(v[key]);                                                                                 // 595
  });                                                                                                               // 596
  return ret;                                                                                                       // 597
}; /**                                                                                                              // 598
    * @summary Allocate a new buffer of binary data that EJSON can serialize.                                       // 600
    * @locus Anywhere                                                                                               // 600
    * @param {Number} size The number of bytes of binary data to allocate.                                          // 600
    */ // EJSON.newBinary is the public documented API for this functionality,                                      // 600
// but the implementation is in the 'base64' package to avoid                                                       // 606
// introducing a circular dependency. (If the implementation were here,                                             // 607
// then 'base64' would have to use EJSON.newBinary, and 'ejson' would                                               // 608
// also have to use 'base64'.)                                                                                      // 609
                                                                                                                    // 609
                                                                                                                    // 609
EJSON.newBinary = Base64.newBinary;                                                                                 // 610
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stringify.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/ejson/stringify.js                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                             //
                                                                                                                    //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                    //
                                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                   //
                                                                                                                    //
// Based on json2.js from https://github.com/douglascrockford/JSON-js                                               // 1
//                                                                                                                  // 2
//    json2.js                                                                                                      // 3
//    2012-10-08                                                                                                    // 4
//                                                                                                                  // 5
//    Public Domain.                                                                                                // 6
//                                                                                                                  // 7
//    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.                                                       // 8
function quote(string) {                                                                                            // 10
  return JSON.stringify(string);                                                                                    // 11
}                                                                                                                   // 12
                                                                                                                    // 12
var str = function (key, holder, singleIndent, outerIndent, canonical) {                                            // 14
  var value = holder[key]; // What happens next depends on the value's type.                                        // 15
                                                                                                                    // 17
  switch (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) {                              // 18
    case 'string':                                                                                                  // 19
      return quote(value);                                                                                          // 20
                                                                                                                    // 20
    case 'number':                                                                                                  // 21
      // JSON numbers must be finite. Encode non-finite numbers as null.                                            // 22
      return isFinite(value) ? String(value) : 'null';                                                              // 23
                                                                                                                    // 23
    case 'boolean':                                                                                                 // 24
      return String(value);                                                                                         // 25
    // If the type is 'object', we might be dealing with an object or an array or                                   // 26
    // null.                                                                                                        // 27
                                                                                                                    // 27
    case 'object':                                                                                                  // 28
      // Due to a specification blunder in ECMAScript, typeof null is 'object',                                     // 29
      // so watch out for that case.                                                                                // 30
      if (!value) {                                                                                                 // 31
        return 'null';                                                                                              // 32
      } // Make an array to hold the partial results of stringifying this object                                    // 33
      // value.                                                                                                     // 35
                                                                                                                    // 35
                                                                                                                    // 35
      var innerIndent = outerIndent + singleIndent;                                                                 // 36
      var partial = []; // Is the value an array?                                                                   // 37
                                                                                                                    // 39
      if (Array.isArray(value) || {}.hasOwnProperty.call(value, 'callee')) {                                        // 40
        // The value is an array. Stringify every element. Use null as a                                            // 41
        // placeholder for non-JSON values.                                                                         // 42
        var length = value.length;                                                                                  // 43
                                                                                                                    // 43
        for (var i = 0; i < length; i += 1) {                                                                       // 44
          partial[i] = str(i, value, singleIndent, innerIndent, canonical) || 'null';                               // 45
        } // Join all of the elements together, separated with commas, and wrap                                     // 47
        // them in brackets.                                                                                        // 50
                                                                                                                    // 50
                                                                                                                    // 50
        var _v = void 0;                                                                                            // 51
                                                                                                                    // 51
        if (partial.length === 0) {                                                                                 // 52
          _v = '[]';                                                                                                // 53
        } else if (innerIndent) {                                                                                   // 54
          _v = '[\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + ']';                  // 55
        } else {                                                                                                    // 62
          _v = '[' + partial.join(',') + ']';                                                                       // 63
        }                                                                                                           // 64
                                                                                                                    // 64
        return _v;                                                                                                  // 65
      } // Iterate through all of the keys in the object.                                                           // 66
                                                                                                                    // 68
                                                                                                                    // 68
      var keys = Object.keys(value);                                                                                // 69
                                                                                                                    // 69
      if (canonical) {                                                                                              // 70
        keys = keys.sort();                                                                                         // 71
      }                                                                                                             // 72
                                                                                                                    // 72
      keys.forEach(function (k) {                                                                                   // 73
        v = str(k, value, singleIndent, innerIndent, canonical);                                                    // 74
                                                                                                                    // 74
        if (v) {                                                                                                    // 75
          partial.push(quote(k) + (innerIndent ? ': ' : ':') + v);                                                  // 76
        }                                                                                                           // 77
      }); // Join all of the member texts together, separated with commas,                                          // 78
      // and wrap them in braces.                                                                                   // 81
                                                                                                                    // 81
      if (partial.length === 0) {                                                                                   // 82
        v = '{}';                                                                                                   // 83
      } else if (innerIndent) {                                                                                     // 84
        v = '{\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + '}';                     // 85
      } else {                                                                                                      // 92
        v = '{' + partial.join(',') + '}';                                                                          // 93
      }                                                                                                             // 94
                                                                                                                    // 94
      return v;                                                                                                     // 95
                                                                                                                    // 95
    default: // Do nothing                                                                                          // 97
  }                                                                                                                 // 18
}; // If the JSON object does not yet have a stringify method, give it one.                                         // 99
                                                                                                                    // 101
                                                                                                                    // 101
var canonicalStringify = function (value, options) {                                                                // 102
  // Make a fake root object containing our value under the key of ''.                                              // 103
  // Return the result of stringifying the value.                                                                   // 104
  var allOptions = Object.assign({                                                                                  // 105
    indent: '',                                                                                                     // 106
    canonical: false                                                                                                // 107
  }, options);                                                                                                      // 105
                                                                                                                    // 105
  if (allOptions.indent === true) {                                                                                 // 109
    allOptions.indent = '  ';                                                                                       // 110
  } else if (typeof allOptions.indent === 'number') {                                                               // 111
    var newIndent = '';                                                                                             // 112
                                                                                                                    // 112
    for (var i = 0; i < allOptions.indent; i++) {                                                                   // 113
      newIndent += ' ';                                                                                             // 114
    }                                                                                                               // 115
                                                                                                                    // 115
    allOptions.indent = newIndent;                                                                                  // 116
  }                                                                                                                 // 117
                                                                                                                    // 117
  return str('', {                                                                                                  // 118
    '': value                                                                                                       // 118
  }, allOptions.indent, '', allOptions.canonical);                                                                  // 118
};                                                                                                                  // 119
                                                                                                                    // 102
module.exportDefault(canonicalStringify);                                                                           // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/ejson/ejson.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.ejson = exports, {
  EJSON: EJSON
});

})();

//# sourceMappingURL=ejson.js.map
