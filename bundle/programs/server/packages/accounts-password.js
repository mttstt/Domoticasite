(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var NpmModuleBcrypt = Package['npm-bcrypt'].NpmModuleBcrypt;
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var SHA256 = Package.sha.SHA256;
var EJSON = Package.ejson.EJSON;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-password":{"email_templates.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/accounts-password/email_templates.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
function greet(welcomeMsg) {                                                                                          // 1
  return function (user, url) {                                                                                       // 2
    var greeting = user.profile && user.profile.name ? "Hello " + user.profile.name + "," : "Hello,";                 // 3
    return greeting + "\n\n" + welcomeMsg + ", simply click the link below.\n\n" + url + "\n\nThanks.\n";             // 5
  };                                                                                                                  // 13
} /**                                                                                                                 // 14
   * @summary Options to customize emails sent from the Accounts system.                                              // 16
   * @locus Server                                                                                                    // 16
   * @importFromPackage accounts-base                                                                                 // 16
   */                                                                                                                 // 16
                                                                                                                      // 16
Accounts.emailTemplates = {                                                                                           // 21
  from: "Accounts Example <no-reply@example.com>",                                                                    // 22
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),                                      // 23
  resetPassword: {                                                                                                    // 25
    subject: function (user) {                                                                                        // 26
      return "How to reset your password on " + Accounts.emailTemplates.siteName;                                     // 27
    },                                                                                                                // 28
    text: greet("To reset your password")                                                                             // 29
  },                                                                                                                  // 25
  verifyEmail: {                                                                                                      // 31
    subject: function (user) {                                                                                        // 32
      return "How to verify email address on " + Accounts.emailTemplates.siteName;                                    // 33
    },                                                                                                                // 34
    text: greet("To verify your account email")                                                                       // 35
  },                                                                                                                  // 31
  enrollAccount: {                                                                                                    // 37
    subject: function (user) {                                                                                        // 38
      return "An account has been created for you on " + Accounts.emailTemplates.siteName;                            // 39
    },                                                                                                                // 40
    text: greet("To start using the service")                                                                         // 41
  }                                                                                                                   // 37
};                                                                                                                    // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"password_server.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/accounts-password/password_server.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
/// BCRYPT                                                                                                            // 1
var bcrypt = NpmModuleBcrypt;                                                                                         // 3
var bcryptHash = Meteor.wrapAsync(bcrypt.hash);                                                                       // 4
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare); // User records have a 'services.password.bcrypt' field on them to hold
// their hashed passwords (unless they have a 'services.password.srp'                                                 // 8
// field, in which case they will be upgraded to bcrypt the next time                                                 // 9
// they log in).                                                                                                      // 10
//                                                                                                                    // 11
// When the client sends a password to the server, it can either be a                                                 // 12
// string (the plaintext password) or an object with keys 'digest' and                                                // 13
// 'algorithm' (must be "sha-256" for now). The Meteor client always sends                                            // 14
// password objects { digest: *, algorithm: "sha-256" }, but DDP clients                                              // 15
// that don't have access to SHA can just send plaintext passwords as                                                 // 16
// strings.                                                                                                           // 17
//                                                                                                                    // 18
// When the server receives a plaintext password as a string, it always                                               // 19
// hashes it with SHA256 before passing it into bcrypt. When the server                                               // 20
// receives a password as an object, it asserts that the algorithm is                                                 // 21
// "sha-256" and then passes the digest to bcrypt.                                                                    // 22
                                                                                                                      // 22
Accounts._bcryptRounds = Accounts._options.bcryptRounds || 10; // Given a 'password' from the client, extract the string that we should
// bcrypt. 'password' can be one of:                                                                                  // 28
//  - String (the plaintext password)                                                                                 // 29
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".                                       // 30
//                                                                                                                    // 31
                                                                                                                      // 31
var getPasswordString = function (password) {                                                                         // 32
  if (typeof password === "string") {                                                                                 // 33
    password = SHA256(password);                                                                                      // 34
  } else {                                                                                                            // 35
    // 'password' is an object                                                                                        // 35
    if (password.algorithm !== "sha-256") {                                                                           // 36
      throw new Error("Invalid password hash algorithm. " + "Only 'sha-256' is allowed.");                            // 37
    }                                                                                                                 // 39
                                                                                                                      // 39
    password = password.digest;                                                                                       // 40
  }                                                                                                                   // 41
                                                                                                                      // 41
  return password;                                                                                                    // 42
}; // Use bcrypt to hash the password for storage in the database.                                                    // 43
// `password` can be a string (in which case it will be run through                                                   // 46
// SHA256 before bcrypt) or an object with properties `digest` and                                                    // 47
// `algorithm` (in which case we bcrypt `password.digest`).                                                           // 48
//                                                                                                                    // 49
                                                                                                                      // 49
                                                                                                                      // 49
var hashPassword = function (password) {                                                                              // 50
  password = getPasswordString(password);                                                                             // 51
  return bcryptHash(password, Accounts._bcryptRounds);                                                                // 52
}; // Extract the number of rounds used in the specified bcrypt hash.                                                 // 53
                                                                                                                      // 55
                                                                                                                      // 55
var getRoundsFromBcryptHash = function (hash) {                                                                       // 56
  var rounds = void 0;                                                                                                // 57
                                                                                                                      // 57
  if (hash) {                                                                                                         // 58
    var hashSegments = hash.split('$');                                                                               // 59
                                                                                                                      // 59
    if (hashSegments.length > 2) {                                                                                    // 60
      rounds = parseInt(hashSegments[2], 10);                                                                         // 61
    }                                                                                                                 // 62
  }                                                                                                                   // 63
                                                                                                                      // 63
  return rounds;                                                                                                      // 64
}; // Check whether the provided password matches the bcrypt'ed password in                                           // 65
// the database user record. `password` can be a string (in which case                                                // 68
// it will be run through SHA256 before bcrypt) or an object with                                                     // 69
// properties `digest` and `algorithm` (in which case we bcrypt                                                       // 70
// `password.digest`).                                                                                                // 71
//                                                                                                                    // 72
                                                                                                                      // 72
                                                                                                                      // 72
Accounts._checkPassword = function (user, password) {                                                                 // 73
  var result = {                                                                                                      // 74
    userId: user._id                                                                                                  // 75
  };                                                                                                                  // 74
  var formattedPassword = getPasswordString(password);                                                                // 78
  var hash = user.services.password.bcrypt;                                                                           // 79
  var hashRounds = getRoundsFromBcryptHash(hash);                                                                     // 80
                                                                                                                      // 80
  if (!bcryptCompare(formattedPassword, hash)) {                                                                      // 82
    result.error = handleError("Incorrect password", false);                                                          // 83
  } else if (hash && Accounts._bcryptRounds != hashRounds) {                                                          // 84
    // The password checks out, but the user's bcrypt hash needs to be updated.                                       // 85
    Meteor.defer(function () {                                                                                        // 86
      Meteor.users.update({                                                                                           // 87
        _id: user._id                                                                                                 // 87
      }, {                                                                                                            // 87
        $set: {                                                                                                       // 88
          'services.password.bcrypt': bcryptHash(formattedPassword, Accounts._bcryptRounds)                           // 89
        }                                                                                                             // 88
      });                                                                                                             // 87
    });                                                                                                               // 93
  }                                                                                                                   // 94
                                                                                                                      // 94
  return result;                                                                                                      // 96
};                                                                                                                    // 97
                                                                                                                      // 73
var checkPassword = Accounts._checkPassword; ///                                                                      // 98
/// ERROR HANDLER                                                                                                     // 101
///                                                                                                                   // 102
                                                                                                                      // 102
var handleError = function (msg) {                                                                                    // 103
  var throwError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;                          // 103
  var error = new Meteor.Error(403, Accounts._options.ambiguousErrorMessages ? "Something went wrong. Please check your credentials." : msg);
                                                                                                                      // 104
  if (throwError) {                                                                                                   // 110
    throw error;                                                                                                      // 111
  }                                                                                                                   // 112
                                                                                                                      // 112
  return error;                                                                                                       // 113
}; ///                                                                                                                // 114
/// LOGIN                                                                                                             // 117
///                                                                                                                   // 118
                                                                                                                      // 118
                                                                                                                      // 118
Accounts._findUserByQuery = function (query) {                                                                        // 120
  var user = null;                                                                                                    // 121
                                                                                                                      // 121
  if (query.id) {                                                                                                     // 123
    user = Meteor.users.findOne({                                                                                     // 124
      _id: query.id                                                                                                   // 124
    });                                                                                                               // 124
  } else {                                                                                                            // 125
    var fieldName;                                                                                                    // 126
    var fieldValue;                                                                                                   // 127
                                                                                                                      // 127
    if (query.username) {                                                                                             // 128
      fieldName = 'username';                                                                                         // 129
      fieldValue = query.username;                                                                                    // 130
    } else if (query.email) {                                                                                         // 131
      fieldName = 'emails.address';                                                                                   // 132
      fieldValue = query.email;                                                                                       // 133
    } else {                                                                                                          // 134
      throw new Error("shouldn't happen (validation missed something)");                                              // 135
    }                                                                                                                 // 136
                                                                                                                      // 136
    var selector = {};                                                                                                // 137
    selector[fieldName] = fieldValue;                                                                                 // 138
    user = Meteor.users.findOne(selector); // If user is not found, try a case insensitive lookup                     // 139
                                                                                                                      // 140
    if (!user) {                                                                                                      // 141
      selector = selectorForFastCaseInsensitiveLookup(fieldName, fieldValue);                                         // 142
      var candidateUsers = Meteor.users.find(selector).fetch(); // No match if multiple candidates are found          // 143
                                                                                                                      // 144
      if (candidateUsers.length === 1) {                                                                              // 145
        user = candidateUsers[0];                                                                                     // 146
      }                                                                                                               // 147
    }                                                                                                                 // 148
  }                                                                                                                   // 149
                                                                                                                      // 149
  return user;                                                                                                        // 151
}; /**                                                                                                                // 152
    * @summary Finds the user with the specified username.                                                            // 154
    * First tries to match username case sensitively; if that fails, it                                               // 154
    * tries case insensitively; but if more than one user matches the case                                            // 154
    * insensitive search, it returns null.                                                                            // 154
    * @locus Server                                                                                                   // 154
    * @param {String} username The username to look for                                                               // 154
    * @returns {Object} A user if found, else null                                                                    // 154
    * @importFromPackage accounts-base                                                                                // 154
    */                                                                                                                // 154
                                                                                                                      // 154
Accounts.findUserByUsername = function (username) {                                                                   // 164
  return Accounts._findUserByQuery({                                                                                  // 165
    username: username                                                                                                // 166
  });                                                                                                                 // 165
}; /**                                                                                                                // 168
    * @summary Finds the user with the specified email.                                                               // 170
    * First tries to match email case sensitively; if that fails, it                                                  // 170
    * tries case insensitively; but if more than one user matches the case                                            // 170
    * insensitive search, it returns null.                                                                            // 170
    * @locus Server                                                                                                   // 170
    * @param {String} email The email address to look for                                                             // 170
    * @returns {Object} A user if found, else null                                                                    // 170
    * @importFromPackage accounts-base                                                                                // 170
    */                                                                                                                // 170
                                                                                                                      // 170
Accounts.findUserByEmail = function (email) {                                                                         // 180
  return Accounts._findUserByQuery({                                                                                  // 181
    email: email                                                                                                      // 182
  });                                                                                                                 // 181
}; // Generates a MongoDB selector that can be used to perform a fast case                                            // 184
// insensitive lookup for the given fieldName and string. Since MongoDB does                                          // 187
// not support case insensitive indexes, and case insensitive regex queries                                           // 188
// are slow, we construct a set of prefix selectors for all permutations of                                           // 189
// the first 4 characters ourselves. We first attempt to matching against                                             // 190
// these, and because 'prefix expression' regex queries do use indexes (see                                           // 191
// http://docs.mongodb.org/v2.6/reference/operator/query/regex/#index-use),                                           // 192
// this has been found to greatly improve performance (from 1200ms to 5ms in a                                        // 193
// test with 1.000.000 users).                                                                                        // 194
                                                                                                                      // 194
                                                                                                                      // 194
var selectorForFastCaseInsensitiveLookup = function (fieldName, string) {                                             // 195
  // Performance seems to improve up to 4 prefix characters                                                           // 196
  var prefix = string.substring(0, Math.min(string.length, 4));                                                       // 197
                                                                                                                      // 197
  var orClause = _.map(generateCasePermutationsForString(prefix), function (prefixPermutation) {                      // 198
    var selector = {};                                                                                                // 200
    selector[fieldName] = new RegExp('^' + Meteor._escapeRegExp(prefixPermutation));                                  // 201
    return selector;                                                                                                  // 203
  });                                                                                                                 // 204
                                                                                                                      // 198
  var caseInsensitiveClause = {};                                                                                     // 205
  caseInsensitiveClause[fieldName] = new RegExp('^' + Meteor._escapeRegExp(string) + '$', 'i');                       // 206
  return {                                                                                                            // 208
    $and: [{                                                                                                          // 208
      $or: orClause                                                                                                   // 208
    }, caseInsensitiveClause]                                                                                         // 208
  };                                                                                                                  // 208
}; // Generates permutations of all case variations of a given string.                                                // 209
                                                                                                                      // 211
                                                                                                                      // 211
var generateCasePermutationsForString = function (string) {                                                           // 212
  var permutations = [''];                                                                                            // 213
                                                                                                                      // 213
  for (var i = 0; i < string.length; i++) {                                                                           // 214
    var ch = string.charAt(i);                                                                                        // 215
    permutations = _.flatten(_.map(permutations, function (prefix) {                                                  // 216
      var lowerCaseChar = ch.toLowerCase();                                                                           // 217
      var upperCaseChar = ch.toUpperCase(); // Don't add unneccesary permutations when ch is not a letter             // 218
                                                                                                                      // 219
      if (lowerCaseChar === upperCaseChar) {                                                                          // 220
        return [prefix + ch];                                                                                         // 221
      } else {                                                                                                        // 222
        return [prefix + lowerCaseChar, prefix + upperCaseChar];                                                      // 223
      }                                                                                                               // 224
    }));                                                                                                              // 225
  }                                                                                                                   // 226
                                                                                                                      // 226
  return permutations;                                                                                                // 227
};                                                                                                                    // 228
                                                                                                                      // 212
var checkForCaseInsensitiveDuplicates = function (fieldName, displayName, fieldValue, ownUserId) {                    // 230
  // Some tests need the ability to add users with the same case insensitive                                          // 231
  // value, hence the _skipCaseInsensitiveChecksForTest check                                                         // 232
  var skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);                                      // 233
                                                                                                                      // 233
  if (fieldValue && !skipCheck) {                                                                                     // 235
    var matchedUsers = Meteor.users.find(selectorForFastCaseInsensitiveLookup(fieldName, fieldValue)).fetch();        // 236
                                                                                                                      // 236
    if (matchedUsers.length > 0 && ( // If we don't have a userId yet, any match we find is a duplicate               // 239
    !ownUserId || // Otherwise, check to see if there are multiple matches or a match                                 // 241
    // that is not us                                                                                                 // 243
    matchedUsers.length > 1 || matchedUsers[0]._id !== ownUserId)) {                                                  // 244
      handleError(displayName + " already exists.");                                                                  // 245
    }                                                                                                                 // 246
  }                                                                                                                   // 247
}; // XXX maybe this belongs in the check package                                                                     // 248
                                                                                                                      // 250
                                                                                                                      // 250
var NonEmptyString = Match.Where(function (x) {                                                                       // 251
  check(x, String);                                                                                                   // 252
  return x.length > 0;                                                                                                // 253
});                                                                                                                   // 254
var userQueryValidator = Match.Where(function (user) {                                                                // 256
  check(user, {                                                                                                       // 257
    id: Match.Optional(NonEmptyString),                                                                               // 258
    username: Match.Optional(NonEmptyString),                                                                         // 259
    email: Match.Optional(NonEmptyString)                                                                             // 260
  });                                                                                                                 // 257
  if (_.keys(user).length !== 1) throw new Match.Error("User property must have exactly one field");                  // 262
  return true;                                                                                                        // 264
});                                                                                                                   // 265
var passwordValidator = Match.OneOf(String, {                                                                         // 267
  digest: String,                                                                                                     // 269
  algorithm: String                                                                                                   // 269
}); // Handler to login with a password.                                                                              // 269
//                                                                                                                    // 273
// The Meteor client sets options.password to an object with keys                                                     // 274
// 'digest' (set to SHA256(password)) and 'algorithm' ("sha-256").                                                    // 275
//                                                                                                                    // 276
// For other DDP clients which don't have access to SHA, the handler                                                  // 277
// also accepts the plaintext password in options.password as a string.                                               // 278
//                                                                                                                    // 279
// (It might be nice if servers could turn the plaintext password                                                     // 280
// option off. Or maybe it should be opt-in, not opt-out?                                                             // 281
// Accounts.config option?)                                                                                           // 282
//                                                                                                                    // 283
// Note that neither password option is secure without SSL.                                                           // 284
//                                                                                                                    // 285
                                                                                                                      // 285
Accounts.registerLoginHandler("password", function (options) {                                                        // 286
  if (!options.password || options.srp) return undefined; // don't handle                                             // 287
                                                                                                                      // 288
  check(options, {                                                                                                    // 290
    user: userQueryValidator,                                                                                         // 291
    password: passwordValidator                                                                                       // 292
  });                                                                                                                 // 290
                                                                                                                      // 290
  var user = Accounts._findUserByQuery(options.user);                                                                 // 296
                                                                                                                      // 296
  if (!user) {                                                                                                        // 297
    handleError("User not found");                                                                                    // 298
  }                                                                                                                   // 299
                                                                                                                      // 299
  if (!user.services || !user.services.password || !(user.services.password.bcrypt || user.services.password.srp)) {  // 301
    handleError("User has no password set");                                                                          // 303
  }                                                                                                                   // 304
                                                                                                                      // 304
  if (!user.services.password.bcrypt) {                                                                               // 306
    if (typeof options.password === "string") {                                                                       // 307
      // The client has presented a plaintext password, and the user is                                               // 308
      // not upgraded to bcrypt yet. We don't attempt to tell the client                                              // 309
      // to upgrade to bcrypt, because it might be a standalone DDP                                                   // 310
      // client doesn't know how to do such a thing.                                                                  // 311
      var verifier = user.services.password.srp;                                                                      // 312
      var newVerifier = SRP.generateVerifier(options.password, {                                                      // 313
        identity: verifier.identity,                                                                                  // 314
        salt: verifier.salt                                                                                           // 314
      });                                                                                                             // 313
                                                                                                                      // 313
      if (verifier.verifier !== newVerifier.verifier) {                                                               // 316
        return {                                                                                                      // 317
          userId: Accounts._options.ambiguousErrorMessages ? null : user._id,                                         // 318
          error: handleError("Incorrect password", false)                                                             // 319
        };                                                                                                            // 317
      }                                                                                                               // 321
                                                                                                                      // 321
      return {                                                                                                        // 323
        userId: user._id                                                                                              // 323
      };                                                                                                              // 323
    } else {                                                                                                          // 324
      // Tell the client to use the SRP upgrade process.                                                              // 325
      throw new Meteor.Error(400, "old password format", EJSON.stringify({                                            // 326
        format: 'srp',                                                                                                // 327
        identity: user.services.password.srp.identity                                                                 // 328
      }));                                                                                                            // 326
    }                                                                                                                 // 330
  }                                                                                                                   // 331
                                                                                                                      // 331
  return checkPassword(user, options.password);                                                                       // 333
}); // Handler to login using the SRP upgrade path. To use this login                                                 // 337
// handler, the client must provide:                                                                                  // 340
//   - srp: H(identity + ":" + password)                                                                              // 341
//   - password: a string or an object with properties 'digest' and 'algorithm'                                       // 342
//                                                                                                                    // 343
// We use `options.srp` to verify that the client knows the correct                                                   // 344
// password without doing a full SRP flow. Once we've checked that, we                                                // 345
// upgrade the user to bcrypt and remove the SRP information from the                                                 // 346
// user document.                                                                                                     // 347
//                                                                                                                    // 348
// The client ends up using this login handler after trying the normal                                                // 349
// login handler (above), which throws an error telling the client to                                                 // 350
// try the SRP upgrade path.                                                                                          // 351
//                                                                                                                    // 352
// XXX COMPAT WITH 0.8.1.3                                                                                            // 353
                                                                                                                      // 353
Accounts.registerLoginHandler("password", function (options) {                                                        // 354
  if (!options.srp || !options.password) {                                                                            // 355
    return undefined; // don't handle                                                                                 // 356
  }                                                                                                                   // 357
                                                                                                                      // 357
  check(options, {                                                                                                    // 359
    user: userQueryValidator,                                                                                         // 360
    srp: String,                                                                                                      // 361
    password: passwordValidator                                                                                       // 362
  });                                                                                                                 // 359
                                                                                                                      // 359
  var user = Accounts._findUserByQuery(options.user);                                                                 // 365
                                                                                                                      // 365
  if (!user) {                                                                                                        // 366
    handleError("User not found");                                                                                    // 367
  } // Check to see if another simultaneous login has already upgraded                                                // 368
  // the user record to bcrypt.                                                                                       // 371
                                                                                                                      // 371
                                                                                                                      // 371
  if (user.services && user.services.password && user.services.password.bcrypt) {                                     // 372
    return checkPassword(user, options.password);                                                                     // 373
  }                                                                                                                   // 374
                                                                                                                      // 374
  if (!(user.services && user.services.password && user.services.password.srp)) {                                     // 376
    handleError("User has no password set");                                                                          // 377
  }                                                                                                                   // 378
                                                                                                                      // 378
  var v1 = user.services.password.srp.verifier;                                                                       // 380
  var v2 = SRP.generateVerifier(null, {                                                                               // 381
    hashedIdentityAndPassword: options.srp,                                                                           // 384
    salt: user.services.password.srp.salt                                                                             // 385
  }).verifier;                                                                                                        // 383
                                                                                                                      // 381
  if (v1 !== v2) {                                                                                                    // 388
    return {                                                                                                          // 389
      userId: Accounts._options.ambiguousErrorMessages ? null : user._id,                                             // 390
      error: handleError("Incorrect password", false)                                                                 // 391
    };                                                                                                                // 389
  } // Upgrade to bcrypt on successful login.                                                                         // 393
                                                                                                                      // 395
                                                                                                                      // 395
  var salted = hashPassword(options.password);                                                                        // 396
  Meteor.users.update(user._id, {                                                                                     // 397
    $unset: {                                                                                                         // 400
      'services.password.srp': 1                                                                                      // 400
    },                                                                                                                // 400
    $set: {                                                                                                           // 401
      'services.password.bcrypt': salted                                                                              // 401
    }                                                                                                                 // 401
  });                                                                                                                 // 399
  return {                                                                                                            // 405
    userId: user._id                                                                                                  // 405
  };                                                                                                                  // 405
}); ///                                                                                                               // 406
/// CHANGING                                                                                                          // 410
///                                                                                                                   // 411
/**                                                                                                                   // 413
 * @summary Change a user's username. Use this instead of updating the                                                // 413
 * database directly. The operation will fail if there is an existing user                                            // 413
 * with a username only differing in case.                                                                            // 413
 * @locus Server                                                                                                      // 413
 * @param {String} userId The ID of the user to update.                                                               // 413
 * @param {String} newUsername A new username for the user.                                                           // 413
 * @importFromPackage accounts-base                                                                                   // 413
 */                                                                                                                   // 413
                                                                                                                      // 413
Accounts.setUsername = function (userId, newUsername) {                                                               // 422
  check(userId, NonEmptyString);                                                                                      // 423
  check(newUsername, NonEmptyString);                                                                                 // 424
  var user = Meteor.users.findOne(userId);                                                                            // 426
                                                                                                                      // 426
  if (!user) {                                                                                                        // 427
    handleError("User not found");                                                                                    // 428
  }                                                                                                                   // 429
                                                                                                                      // 429
  var oldUsername = user.username; // Perform a case insensitive check for duplicates before update                   // 431
                                                                                                                      // 433
  checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                   // 434
  Meteor.users.update({                                                                                               // 436
    _id: user._id                                                                                                     // 436
  }, {                                                                                                                // 436
    $set: {                                                                                                           // 436
      username: newUsername                                                                                           // 436
    }                                                                                                                 // 436
  }); // Perform another check after update, in case a matching user has been                                         // 436
  // inserted in the meantime                                                                                         // 439
                                                                                                                      // 439
  try {                                                                                                               // 440
    checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                 // 441
  } catch (ex) {                                                                                                      // 442
    // Undo update if the check fails                                                                                 // 443
    Meteor.users.update({                                                                                             // 444
      _id: user._id                                                                                                   // 444
    }, {                                                                                                              // 444
      $set: {                                                                                                         // 444
        username: oldUsername                                                                                         // 444
      }                                                                                                               // 444
    });                                                                                                               // 444
    throw ex;                                                                                                         // 445
  }                                                                                                                   // 446
}; // Let the user change their own password if they know the old                                                     // 447
// password. `oldPassword` and `newPassword` should be objects with keys                                              // 450
// `digest` and `algorithm` (representing the SHA256 of the password).                                                // 451
//                                                                                                                    // 452
// XXX COMPAT WITH 0.8.1.3                                                                                            // 453
// Like the login method, if the user hasn't been upgraded from SRP to                                                // 454
// bcrypt yet, then this method will throw an 'old password format'                                                   // 455
// error. The client should call the SRP upgrade login handler and then                                               // 456
// retry this method again.                                                                                           // 457
//                                                                                                                    // 458
// UNLIKE the login method, there is no way to avoid getting SRP upgrade                                              // 459
// errors thrown. The reasoning for this is that clients using this                                                   // 460
// method directly will need to be updated anyway because we no longer                                                // 461
// support the SRP flow that they would have been doing to use this                                                   // 462
// method previously.                                                                                                 // 463
                                                                                                                      // 463
                                                                                                                      // 463
Meteor.methods({                                                                                                      // 464
  changePassword: function (oldPassword, newPassword) {                                                               // 464
    check(oldPassword, passwordValidator);                                                                            // 465
    check(newPassword, passwordValidator);                                                                            // 466
                                                                                                                      // 466
    if (!this.userId) {                                                                                               // 468
      throw new Meteor.Error(401, "Must be logged in");                                                               // 469
    }                                                                                                                 // 470
                                                                                                                      // 470
    var user = Meteor.users.findOne(this.userId);                                                                     // 472
                                                                                                                      // 472
    if (!user) {                                                                                                      // 473
      handleError("User not found");                                                                                  // 474
    }                                                                                                                 // 475
                                                                                                                      // 475
    if (!user.services || !user.services.password || !user.services.password.bcrypt && !user.services.password.srp) {
      handleError("User has no password set");                                                                        // 479
    }                                                                                                                 // 480
                                                                                                                      // 480
    if (!user.services.password.bcrypt) {                                                                             // 482
      throw new Meteor.Error(400, "old password format", EJSON.stringify({                                            // 483
        format: 'srp',                                                                                                // 484
        identity: user.services.password.srp.identity                                                                 // 485
      }));                                                                                                            // 483
    }                                                                                                                 // 487
                                                                                                                      // 487
    var result = checkPassword(user, oldPassword);                                                                    // 489
                                                                                                                      // 489
    if (result.error) {                                                                                               // 490
      throw result.error;                                                                                             // 491
    }                                                                                                                 // 492
                                                                                                                      // 492
    var hashed = hashPassword(newPassword); // It would be better if this removed ALL existing tokens and replaced    // 494
    // the token for the current connection with a new one, but that would                                            // 497
    // be tricky, so we'll settle for just replacing all tokens other than                                            // 498
    // the one for the current connection.                                                                            // 499
                                                                                                                      // 499
    var currentToken = Accounts._getLoginToken(this.connection.id);                                                   // 500
                                                                                                                      // 500
    Meteor.users.update({                                                                                             // 501
      _id: this.userId                                                                                                // 502
    }, {                                                                                                              // 502
      $set: {                                                                                                         // 504
        'services.password.bcrypt': hashed                                                                            // 504
      },                                                                                                              // 504
      $pull: {                                                                                                        // 505
        'services.resume.loginTokens': {                                                                              // 506
          hashedToken: {                                                                                              // 506
            $ne: currentToken                                                                                         // 506
          }                                                                                                           // 506
        }                                                                                                             // 506
      },                                                                                                              // 505
      $unset: {                                                                                                       // 508
        'services.password.reset': 1                                                                                  // 508
      }                                                                                                               // 508
    });                                                                                                               // 503
    return {                                                                                                          // 512
      passwordChanged: true                                                                                           // 512
    };                                                                                                                // 512
  }                                                                                                                   // 513
}); // Force change the users password.                                                                               // 464
/**                                                                                                                   // 518
 * @summary Forcibly change the password for a user.                                                                  // 518
 * @locus Server                                                                                                      // 518
 * @param {String} userId The id of the user to update.                                                               // 518
 * @param {String} newPassword A new password for the user.                                                           // 518
 * @param {Object} [options]                                                                                          // 518
 * @param {Object} options.logout Logout all current connections with this userId (default: true)                     // 518
 * @importFromPackage accounts-base                                                                                   // 518
 */                                                                                                                   // 518
                                                                                                                      // 518
Accounts.setPassword = function (userId, newPlaintextPassword, options) {                                             // 527
  options = _.extend({                                                                                                // 528
    logout: true                                                                                                      // 528
  }, options);                                                                                                        // 528
  var user = Meteor.users.findOne(userId);                                                                            // 530
                                                                                                                      // 530
  if (!user) {                                                                                                        // 531
    throw new Meteor.Error(403, "User not found");                                                                    // 532
  }                                                                                                                   // 533
                                                                                                                      // 533
  var update = {                                                                                                      // 535
    $unset: {                                                                                                         // 536
      'services.password.srp': 1,                                                                                     // 537
      // XXX COMPAT WITH 0.8.1.3                                                                                      // 537
      'services.password.reset': 1                                                                                    // 538
    },                                                                                                                // 536
    $set: {                                                                                                           // 540
      'services.password.bcrypt': hashPassword(newPlaintextPassword)                                                  // 540
    }                                                                                                                 // 540
  };                                                                                                                  // 535
                                                                                                                      // 535
  if (options.logout) {                                                                                               // 543
    update.$unset['services.resume.loginTokens'] = 1;                                                                 // 544
  }                                                                                                                   // 545
                                                                                                                      // 545
  Meteor.users.update({                                                                                               // 547
    _id: user._id                                                                                                     // 547
  }, update);                                                                                                         // 547
}; ///                                                                                                                // 548
/// RESETTING VIA EMAIL                                                                                               // 552
///                                                                                                                   // 553
// Method called by a user to request a password reset email. This is                                                 // 555
// the start of the reset process.                                                                                    // 556
                                                                                                                      // 556
                                                                                                                      // 556
Meteor.methods({                                                                                                      // 557
  forgotPassword: function (options) {                                                                                // 557
    check(options, {                                                                                                  // 558
      email: String                                                                                                   // 558
    });                                                                                                               // 558
    var user = Accounts.findUserByEmail(options.email);                                                               // 560
                                                                                                                      // 560
    if (!user) {                                                                                                      // 561
      handleError("User not found");                                                                                  // 562
    }                                                                                                                 // 563
                                                                                                                      // 563
    var emails = _.pluck(user.emails || [], 'address');                                                               // 565
                                                                                                                      // 565
    var caseSensitiveEmail = _.find(emails, function (email) {                                                        // 566
      return email.toLowerCase() === options.email.toLowerCase();                                                     // 567
    });                                                                                                               // 568
                                                                                                                      // 566
    Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);                                                    // 570
  }                                                                                                                   // 571
}); /**                                                                                                               // 557
     * @summary Generates a reset token and saves it into the database.                                               // 573
     * @locus Server                                                                                                  // 573
     * @param {String} userId The id of the user to generate the reset token for.                                     // 573
     * @param {String} email Which address of the user to generate the reset token for. This address must be in the user's `emails` list. If `null`, defaults to the first email in the list.
     * @param {String} reason `resetPassword` or `enrollAccount`.                                                     // 573
     * @param {Object} [extraTokenData] Optional additional data to be added into the token record.                   // 573
     * @returns {Object} Object with {email, user, token} values.                                                     // 573
     * @importFromPackage accounts-base                                                                               // 573
     */                                                                                                               // 573
                                                                                                                      // 573
Accounts.generateResetToken = function (userId, email, reason, extraTokenData) {                                      // 583
  // Make sure the user exists, and email is one of their addresses.                                                  // 584
  var user = Meteor.users.findOne(userId);                                                                            // 585
                                                                                                                      // 585
  if (!user) {                                                                                                        // 586
    handleError("Can't find user");                                                                                   // 587
  } // pick the first email if we weren't passed an email.                                                            // 588
                                                                                                                      // 590
                                                                                                                      // 590
  if (!email && user.emails && user.emails[0]) {                                                                      // 591
    email = user.emails[0].address;                                                                                   // 592
  } // make sure we have a valid email                                                                                // 593
                                                                                                                      // 595
                                                                                                                      // 595
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) {                                          // 596
    handleError("No such email for user.");                                                                           // 597
  }                                                                                                                   // 598
                                                                                                                      // 598
  var token = Random.secret();                                                                                        // 600
  var tokenRecord = {                                                                                                 // 601
    token: token,                                                                                                     // 602
    email: email,                                                                                                     // 603
    when: new Date()                                                                                                  // 604
  };                                                                                                                  // 601
                                                                                                                      // 601
  if (reason === 'resetPassword') {                                                                                   // 607
    tokenRecord.reason = 'reset';                                                                                     // 608
  } else if (reason === 'enrollAccount') {                                                                            // 609
    tokenRecord.reason = 'enroll';                                                                                    // 610
  } else if (reason) {                                                                                                // 611
    // fallback so that this function can be used for unknown reasons as well                                         // 612
    tokenRecord.reason = reason;                                                                                      // 613
  }                                                                                                                   // 614
                                                                                                                      // 614
  if (extraTokenData) {                                                                                               // 616
    _.extend(tokenRecord, extraTokenData);                                                                            // 617
  }                                                                                                                   // 618
                                                                                                                      // 618
  Meteor.users.update({                                                                                               // 620
    _id: user._id                                                                                                     // 620
  }, {                                                                                                                // 620
    $set: {                                                                                                           // 620
      'services.password.reset': tokenRecord                                                                          // 621
    }                                                                                                                 // 620
  }); // before passing to template, update user object with new token                                                // 620
                                                                                                                      // 624
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;                                                   // 625
  return {                                                                                                            // 627
    email: email,                                                                                                     // 627
    user: user,                                                                                                       // 627
    token: token                                                                                                      // 627
  };                                                                                                                  // 627
}; /**                                                                                                                // 628
    * @summary Generates an e-mail verification token and saves it into the database.                                 // 630
    * @locus Server                                                                                                   // 630
    * @param {String} userId The id of the user to generate the  e-mail verification token for.                       // 630
    * @param {String} email Which address of the user to generate the e-mail verification token for. This address must be in the user's `emails` list. If `null`, defaults to the first unverified email in the list.
    * @param {Object} [extraTokenData] Optional additional data to be added into the token record.                    // 630
    * @returns {Object} Object with {email, user, token} values.                                                      // 630
    * @importFromPackage accounts-base                                                                                // 630
    */                                                                                                                // 630
                                                                                                                      // 630
Accounts.generateVerificationToken = function (userId, email, extraTokenData) {                                       // 639
  // Make sure the user exists, and email is one of their addresses.                                                  // 640
  var user = Meteor.users.findOne(userId);                                                                            // 641
                                                                                                                      // 641
  if (!user) {                                                                                                        // 642
    handleError("Can't find user");                                                                                   // 643
  } // pick the first unverified email if we weren't passed an email.                                                 // 644
                                                                                                                      // 646
                                                                                                                      // 646
  if (!email) {                                                                                                       // 647
    var emailRecord = _.find(user.emails || [], function (e) {                                                        // 648
      return !e.verified;                                                                                             // 648
    });                                                                                                               // 648
                                                                                                                      // 648
    email = (emailRecord || {}).address;                                                                              // 649
                                                                                                                      // 649
    if (!email) {                                                                                                     // 651
      handleError("That user has no unverified email addresses.");                                                    // 652
    }                                                                                                                 // 653
  } // make sure we have a valid email                                                                                // 654
                                                                                                                      // 656
                                                                                                                      // 656
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) {                                          // 657
    handleError("No such email for user.");                                                                           // 658
  }                                                                                                                   // 659
                                                                                                                      // 659
  var token = Random.secret();                                                                                        // 661
  var tokenRecord = {                                                                                                 // 662
    token: token,                                                                                                     // 663
    // TODO: This should probably be renamed to "email" to match reset token record.                                  // 664
    address: email,                                                                                                   // 665
    when: new Date()                                                                                                  // 666
  };                                                                                                                  // 662
                                                                                                                      // 662
  if (extraTokenData) {                                                                                               // 669
    _.extend(tokenRecord, extraTokenData);                                                                            // 670
  }                                                                                                                   // 671
                                                                                                                      // 671
  Meteor.users.update({                                                                                               // 673
    _id: user._id                                                                                                     // 673
  }, {                                                                                                                // 673
    $push: {                                                                                                          // 673
      'services.email.verificationTokens': tokenRecord                                                                // 674
    }                                                                                                                 // 673
  }); // before passing to template, update user object with new token                                                // 673
                                                                                                                      // 677
  Meteor._ensure(user, 'services', 'email');                                                                          // 678
                                                                                                                      // 678
  if (!user.services.email.verificationTokens) {                                                                      // 679
    user.services.email.verificationTokens = [];                                                                      // 680
  }                                                                                                                   // 681
                                                                                                                      // 681
  user.services.email.verificationTokens.push(tokenRecord);                                                           // 682
  return {                                                                                                            // 684
    email: email,                                                                                                     // 684
    user: user,                                                                                                       // 684
    token: token                                                                                                      // 684
  };                                                                                                                  // 684
}; /**                                                                                                                // 685
    * @summary Creates options for email sending for reset password and enroll account emails.                        // 687
    * You can use this function when customizing a reset password or enroll account email sending.                    // 687
    * @locus Server                                                                                                   // 687
    * @param {Object} email Which address of the user's to send the email to.                                         // 687
    * @param {Object} user The user object to generate options for.                                                   // 687
    * @param {String} url URL to which user is directed to confirm the email.                                         // 687
    * @param {String} reason `resetPassword` or `enrollAccount`.                                                      // 687
    * @returns {Object} Options which can be passed to `Email.send`.                                                  // 687
    * @importFromPackage accounts-base                                                                                // 687
    */                                                                                                                // 687
                                                                                                                      // 687
Accounts.generateOptionsForEmail = function (email, user, url, reason) {                                              // 698
  var options = {                                                                                                     // 699
    to: email,                                                                                                        // 700
    from: Accounts.emailTemplates[reason].from ? Accounts.emailTemplates[reason].from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates[reason].subject(user)                                                            // 704
  };                                                                                                                  // 699
                                                                                                                      // 699
  if (typeof Accounts.emailTemplates[reason].text === 'function') {                                                   // 707
    options.text = Accounts.emailTemplates[reason].text(user, url);                                                   // 708
  }                                                                                                                   // 709
                                                                                                                      // 709
  if (typeof Accounts.emailTemplates[reason].html === 'function') {                                                   // 711
    options.html = Accounts.emailTemplates[reason].html(user, url);                                                   // 712
  }                                                                                                                   // 713
                                                                                                                      // 713
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                          // 715
    options.headers = Accounts.emailTemplates.headers;                                                                // 716
  }                                                                                                                   // 717
                                                                                                                      // 717
  return options;                                                                                                     // 719
}; // send the user an email with a link that when opened allows the user                                             // 720
// to set a new password, without the old password.                                                                   // 723
/**                                                                                                                   // 725
 * @summary Send an email with a link the user can use to reset their password.                                       // 725
 * @locus Server                                                                                                      // 725
 * @param {String} userId The id of the user to send email to.                                                        // 725
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 * @param {Object} [extraTokenData] Optional additional data to be added into the token record.                       // 725
 * @returns {Object} Object with {email, user, token, url, options} values.                                           // 725
 * @importFromPackage accounts-base                                                                                   // 725
 */                                                                                                                   // 725
                                                                                                                      // 725
Accounts.sendResetPasswordEmail = function (userId, email, extraTokenData) {                                          // 734
  var _Accounts$generateRes = Accounts.generateResetToken(userId, email, 'resetPassword', extraTokenData),            // 734
      realEmail = _Accounts$generateRes.email,                                                                        // 734
      user = _Accounts$generateRes.user,                                                                              // 734
      token = _Accounts$generateRes.token;                                                                            // 734
                                                                                                                      // 734
  var url = Accounts.urls.resetPassword(token);                                                                       // 737
  var options = Accounts.generateOptionsForEmail(realEmail, user, url, 'resetPassword');                              // 738
  Email.send(options);                                                                                                // 739
  return {                                                                                                            // 740
    email: realEmail,                                                                                                 // 740
    user: user,                                                                                                       // 740
    token: token,                                                                                                     // 740
    url: url,                                                                                                         // 740
    options: options                                                                                                  // 740
  };                                                                                                                  // 740
}; // send the user an email informing them that their account was created, with                                      // 741
// a link that when opened both marks their email as verified and forces them                                         // 744
// to choose their password. The email must be one of the addresses in the                                            // 745
// user's emails field, or undefined to pick the first email automatically.                                           // 746
//                                                                                                                    // 747
// This is not called automatically. It must be called manually if you                                                // 748
// want to use enrollment emails.                                                                                     // 749
/**                                                                                                                   // 751
 * @summary Send an email with a link the user can use to set their initial password.                                 // 751
 * @locus Server                                                                                                      // 751
 * @param {String} userId The id of the user to send email to.                                                        // 751
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 * @param {Object} [extraTokenData] Optional additional data to be added into the token record.                       // 751
 * @returns {Object} Object with {email, user, token, url, options} values.                                           // 751
 * @importFromPackage accounts-base                                                                                   // 751
 */                                                                                                                   // 751
                                                                                                                      // 751
Accounts.sendEnrollmentEmail = function (userId, email, extraTokenData) {                                             // 760
  var _Accounts$generateRes2 = Accounts.generateResetToken(userId, email, 'enrollAccount', extraTokenData),           // 760
      realEmail = _Accounts$generateRes2.email,                                                                       // 760
      user = _Accounts$generateRes2.user,                                                                             // 760
      token = _Accounts$generateRes2.token;                                                                           // 760
                                                                                                                      // 760
  var url = Accounts.urls.enrollAccount(token);                                                                       // 763
  var options = Accounts.generateOptionsForEmail(realEmail, user, url, 'enrollAccount');                              // 764
  Email.send(options);                                                                                                // 765
  return {                                                                                                            // 766
    email: realEmail,                                                                                                 // 766
    user: user,                                                                                                       // 766
    token: token,                                                                                                     // 766
    url: url,                                                                                                         // 766
    options: options                                                                                                  // 766
  };                                                                                                                  // 766
}; // Take token from sendResetPasswordEmail or sendEnrollmentEmail, change                                           // 767
// the users password, and log them in.                                                                               // 771
                                                                                                                      // 771
                                                                                                                      // 771
Meteor.methods({                                                                                                      // 772
  resetPassword: function (token, newPassword) {                                                                      // 772
    var self = this;                                                                                                  // 773
    return Accounts._loginMethod(self, "resetPassword", arguments, "password", function () {                          // 774
      check(token, String);                                                                                           // 780
      check(newPassword, passwordValidator);                                                                          // 781
      var user = Meteor.users.findOne({                                                                               // 783
        "services.password.reset.token": token                                                                        // 784
      });                                                                                                             // 783
                                                                                                                      // 783
      if (!user) {                                                                                                    // 785
        throw new Meteor.Error(403, "Token expired");                                                                 // 786
      }                                                                                                               // 787
                                                                                                                      // 787
      var when = user.services.password.reset.when;                                                                   // 788
      var reason = user.services.password.reset.reason;                                                               // 789
                                                                                                                      // 789
      var tokenLifetimeMs = Accounts._getPasswordResetTokenLifetimeMs();                                              // 790
                                                                                                                      // 790
      if (reason === "enroll") {                                                                                      // 791
        tokenLifetimeMs = Accounts._getPasswordEnrollTokenLifetimeMs();                                               // 792
      }                                                                                                               // 793
                                                                                                                      // 793
      var currentTimeMs = Date.now();                                                                                 // 794
      if (currentTimeMs - when > tokenLifetimeMs) throw new Meteor.Error(403, "Token expired");                       // 795
      var email = user.services.password.reset.email;                                                                 // 797
      if (!_.include(_.pluck(user.emails || [], 'address'), email)) return {                                          // 798
        userId: user._id,                                                                                             // 800
        error: new Meteor.Error(403, "Token has invalid email address")                                               // 801
      };                                                                                                              // 799
      var hashed = hashPassword(newPassword); // NOTE: We're about to invalidate tokens on the user, who we might be  // 804
      // logged in as. Make sure to avoid logging ourselves out if this                                               // 807
      // happens. But also make sure not to leave the connection in a state                                           // 808
      // of having a bad token set if things fail.                                                                    // 809
                                                                                                                      // 809
      var oldToken = Accounts._getLoginToken(self.connection.id);                                                     // 810
                                                                                                                      // 810
      Accounts._setLoginToken(user._id, self.connection, null);                                                       // 811
                                                                                                                      // 811
      var resetToOldToken = function () {                                                                             // 812
        Accounts._setLoginToken(user._id, self.connection, oldToken);                                                 // 813
      };                                                                                                              // 814
                                                                                                                      // 812
      try {                                                                                                           // 816
        // Update the user record by:                                                                                 // 817
        // - Changing the password to the new one                                                                     // 818
        // - Forgetting about the reset token that was just used                                                      // 819
        // - Verifying their email, since they got the password reset via email.                                      // 820
        var affectedRecords = Meteor.users.update({                                                                   // 821
          _id: user._id,                                                                                              // 823
          'emails.address': email,                                                                                    // 824
          'services.password.reset.token': token                                                                      // 825
        }, {                                                                                                          // 822
          $set: {                                                                                                     // 827
            'services.password.bcrypt': hashed,                                                                       // 827
            'emails.$.verified': true                                                                                 // 828
          },                                                                                                          // 827
          $unset: {                                                                                                   // 829
            'services.password.reset': 1,                                                                             // 829
            'services.password.srp': 1                                                                                // 830
          }                                                                                                           // 829
        });                                                                                                           // 827
        if (affectedRecords !== 1) return {                                                                           // 831
          userId: user._id,                                                                                           // 833
          error: new Meteor.Error(403, "Invalid email")                                                               // 834
        };                                                                                                            // 832
      } catch (err) {                                                                                                 // 836
        resetToOldToken();                                                                                            // 837
        throw err;                                                                                                    // 838
      } // Replace all valid login tokens with new ones (changing                                                     // 839
      // password should invalidate existing sessions).                                                               // 842
                                                                                                                      // 842
                                                                                                                      // 842
      Accounts._clearAllLoginTokens(user._id);                                                                        // 843
                                                                                                                      // 843
      return {                                                                                                        // 845
        userId: user._id                                                                                              // 845
      };                                                                                                              // 845
    });                                                                                                               // 846
  }                                                                                                                   // 848
}); ///                                                                                                               // 772
/// EMAIL VERIFICATION                                                                                                // 851
///                                                                                                                   // 852
// send the user an email with a link that when opened marks that                                                     // 855
// address as verified                                                                                                // 856
/**                                                                                                                   // 858
 * @summary Send an email with a link the user can use verify their email address.                                    // 858
 * @locus Server                                                                                                      // 858
 * @param {String} userId The id of the user to send email to.                                                        // 858
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first unverified email in the list.
 * @param {Object} [extraTokenData] Optional additional data to be added into the token record.                       // 858
 * @returns {Object} Object with {email, user, token, url, options} values.                                           // 858
 * @importFromPackage accounts-base                                                                                   // 858
 */                                                                                                                   // 858
                                                                                                                      // 858
Accounts.sendVerificationEmail = function (userId, email, extraTokenData) {                                           // 867
  // XXX Also generate a link using which someone can delete this                                                     // 868
  // account if they own said address but weren't those who created                                                   // 869
  // this account.                                                                                                    // 870
  var _Accounts$generateVer = Accounts.generateVerificationToken(userId, email, extraTokenData),                      // 867
      realEmail = _Accounts$generateVer.email,                                                                        // 867
      user = _Accounts$generateVer.user,                                                                              // 867
      token = _Accounts$generateVer.token;                                                                            // 867
                                                                                                                      // 867
  var url = Accounts.urls.verifyEmail(token);                                                                         // 874
  var options = Accounts.generateOptionsForEmail(realEmail, user, url, 'verifyEmail');                                // 875
  Email.send(options);                                                                                                // 876
  return {                                                                                                            // 877
    email: realEmail,                                                                                                 // 877
    user: user,                                                                                                       // 877
    token: token,                                                                                                     // 877
    url: url,                                                                                                         // 877
    options: options                                                                                                  // 877
  };                                                                                                                  // 877
}; // Take token from sendVerificationEmail, mark the email as verified,                                              // 878
// and log them in.                                                                                                   // 881
                                                                                                                      // 881
                                                                                                                      // 881
Meteor.methods({                                                                                                      // 882
  verifyEmail: function (token) {                                                                                     // 882
    var self = this;                                                                                                  // 883
    return Accounts._loginMethod(self, "verifyEmail", arguments, "password", function () {                            // 884
      check(token, String);                                                                                           // 890
      var user = Meteor.users.findOne({                                                                               // 892
        'services.email.verificationTokens.token': token                                                              // 893
      });                                                                                                             // 893
      if (!user) throw new Meteor.Error(403, "Verify email link expired");                                            // 894
                                                                                                                      // 895
      var tokenRecord = _.find(user.services.email.verificationTokens, function (t) {                                 // 897
        return t.token == token;                                                                                      // 899
      });                                                                                                             // 900
                                                                                                                      // 897
      if (!tokenRecord) return {                                                                                      // 901
        userId: user._id,                                                                                             // 903
        error: new Meteor.Error(403, "Verify email link expired")                                                     // 904
      };                                                                                                              // 902
                                                                                                                      // 902
      var emailsRecord = _.find(user.emails, function (e) {                                                           // 907
        return e.address == tokenRecord.address;                                                                      // 908
      });                                                                                                             // 909
                                                                                                                      // 907
      if (!emailsRecord) return {                                                                                     // 910
        userId: user._id,                                                                                             // 912
        error: new Meteor.Error(403, "Verify email link is for unknown address")                                      // 913
      }; // By including the address in the query, we can use 'emails.$' in the                                       // 911
      // modifier to get a reference to the specific object in the emails                                             // 917
      // array. See                                                                                                   // 918
      // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)                             // 919
      // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull                                                // 920
                                                                                                                      // 920
      Meteor.users.update({                                                                                           // 921
        _id: user._id,                                                                                                // 922
        'emails.address': tokenRecord.address                                                                         // 923
      }, {                                                                                                            // 922
        $set: {                                                                                                       // 924
          'emails.$.verified': true                                                                                   // 924
        },                                                                                                            // 924
        $pull: {                                                                                                      // 925
          'services.email.verificationTokens': {                                                                      // 925
            address: tokenRecord.address                                                                              // 925
          }                                                                                                           // 925
        }                                                                                                             // 925
      });                                                                                                             // 924
      return {                                                                                                        // 927
        userId: user._id                                                                                              // 927
      };                                                                                                              // 927
    });                                                                                                               // 928
  }                                                                                                                   // 930
}); /**                                                                                                               // 882
     * @summary Add an email address for a user. Use this instead of directly                                         // 932
     * updating the database. The operation will fail if there is a different user                                    // 932
     * with an email only differing in case. If the specified user has an existing                                    // 932
     * email only differing in case however, we replace it.                                                           // 932
     * @locus Server                                                                                                  // 932
     * @param {String} userId The ID of the user to update.                                                           // 932
     * @param {String} newEmail A new email address for the user.                                                     // 932
     * @param {Boolean} [verified] Optional - whether the new email address should                                    // 932
     * be marked as verified. Defaults to false.                                                                      // 932
     * @importFromPackage accounts-base                                                                               // 932
     */                                                                                                               // 932
                                                                                                                      // 932
Accounts.addEmail = function (userId, newEmail, verified) {                                                           // 944
  check(userId, NonEmptyString);                                                                                      // 945
  check(newEmail, NonEmptyString);                                                                                    // 946
  check(verified, Match.Optional(Boolean));                                                                           // 947
                                                                                                                      // 947
  if (_.isUndefined(verified)) {                                                                                      // 949
    verified = false;                                                                                                 // 950
  }                                                                                                                   // 951
                                                                                                                      // 951
  var user = Meteor.users.findOne(userId);                                                                            // 953
  if (!user) throw new Meteor.Error(403, "User not found"); // Allow users to change their own email to a version with a different case
  // We don't have to call checkForCaseInsensitiveDuplicates to do a case                                             // 959
  // insensitive check across all emails in the database here because: (1) if                                         // 960
  // there is no case-insensitive duplicate between this user and other users,                                        // 961
  // then we are OK and (2) if this would create a conflict with other users                                          // 962
  // then there would already be a case-insensitive duplicate and we can't fix                                        // 963
  // that in this code anyway.                                                                                        // 964
                                                                                                                      // 964
  var caseInsensitiveRegExp = new RegExp('^' + Meteor._escapeRegExp(newEmail) + '$', 'i');                            // 965
                                                                                                                      // 965
  var didUpdateOwnEmail = _.any(user.emails, function (email, index) {                                                // 968
    if (caseInsensitiveRegExp.test(email.address)) {                                                                  // 969
      Meteor.users.update({                                                                                           // 970
        _id: user._id,                                                                                                // 971
        'emails.address': email.address                                                                               // 972
      }, {                                                                                                            // 970
        $set: {                                                                                                       // 973
          'emails.$.address': newEmail,                                                                               // 974
          'emails.$.verified': verified                                                                               // 975
        }                                                                                                             // 973
      });                                                                                                             // 973
      return true;                                                                                                    // 977
    }                                                                                                                 // 978
                                                                                                                      // 978
    return false;                                                                                                     // 980
  }); // In the other updates below, we have to do another call to                                                    // 981
  // checkForCaseInsensitiveDuplicates to make sure that no conflicting values                                        // 984
  // were added to the database in the meantime. We don't have to do this for                                         // 985
  // the case where the user is updating their email address to one that is the                                       // 986
  // same as before, but only different because of capitalization. Read the                                           // 987
  // big comment above to understand why.                                                                             // 988
                                                                                                                      // 988
                                                                                                                      // 988
  if (didUpdateOwnEmail) {                                                                                            // 990
    return;                                                                                                           // 991
  } // Perform a case insensitive check for duplicates before update                                                  // 992
                                                                                                                      // 994
                                                                                                                      // 994
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                   // 995
  Meteor.users.update({                                                                                               // 997
    _id: user._id                                                                                                     // 998
  }, {                                                                                                                // 997
    $addToSet: {                                                                                                      // 1000
      emails: {                                                                                                       // 1001
        address: newEmail,                                                                                            // 1002
        verified: verified                                                                                            // 1003
      }                                                                                                               // 1001
    }                                                                                                                 // 1000
  }); // Perform another check after update, in case a matching user has been                                         // 999
  // inserted in the meantime                                                                                         // 1009
                                                                                                                      // 1009
  try {                                                                                                               // 1010
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                 // 1011
  } catch (ex) {                                                                                                      // 1012
    // Undo update if the check fails                                                                                 // 1013
    Meteor.users.update({                                                                                             // 1014
      _id: user._id                                                                                                   // 1014
    }, {                                                                                                              // 1014
      $pull: {                                                                                                        // 1015
        emails: {                                                                                                     // 1015
          address: newEmail                                                                                           // 1015
        }                                                                                                             // 1015
      }                                                                                                               // 1015
    });                                                                                                               // 1015
    throw ex;                                                                                                         // 1016
  }                                                                                                                   // 1017
}; /**                                                                                                                // 1018
    * @summary Remove an email address for a user. Use this instead of updating                                       // 1020
    * the database directly.                                                                                          // 1020
    * @locus Server                                                                                                   // 1020
    * @param {String} userId The ID of the user to update.                                                            // 1020
    * @param {String} email The email address to remove.                                                              // 1020
    * @importFromPackage accounts-base                                                                                // 1020
    */                                                                                                                // 1020
                                                                                                                      // 1020
Accounts.removeEmail = function (userId, email) {                                                                     // 1028
  check(userId, NonEmptyString);                                                                                      // 1029
  check(email, NonEmptyString);                                                                                       // 1030
  var user = Meteor.users.findOne(userId);                                                                            // 1032
  if (!user) throw new Meteor.Error(403, "User not found");                                                           // 1033
  Meteor.users.update({                                                                                               // 1036
    _id: user._id                                                                                                     // 1036
  }, {                                                                                                                // 1036
    $pull: {                                                                                                          // 1037
      emails: {                                                                                                       // 1037
        address: email                                                                                                // 1037
      }                                                                                                               // 1037
    }                                                                                                                 // 1037
  });                                                                                                                 // 1037
}; ///                                                                                                                // 1038
/// CREATING USERS                                                                                                    // 1041
///                                                                                                                   // 1042
// Shared createUser function called from the createUser method, both                                                 // 1044
// if originates in client or server code. Calls user provided hooks,                                                 // 1045
// does the actual user insertion.                                                                                    // 1046
//                                                                                                                    // 1047
// returns the user id                                                                                                // 1048
                                                                                                                      // 1048
                                                                                                                      // 1048
var createUser = function (options) {                                                                                 // 1049
  // Unknown keys allowed, because a onCreateUserHook can take arbitrary                                              // 1050
  // options.                                                                                                         // 1051
  check(options, Match.ObjectIncluding({                                                                              // 1052
    username: Match.Optional(String),                                                                                 // 1053
    email: Match.Optional(String),                                                                                    // 1054
    password: Match.Optional(passwordValidator)                                                                       // 1055
  }));                                                                                                                // 1052
  var username = options.username;                                                                                    // 1058
  var email = options.email;                                                                                          // 1059
  if (!username && !email) throw new Meteor.Error(400, "Need to set a username or email");                            // 1060
  var user = {                                                                                                        // 1063
    services: {}                                                                                                      // 1063
  };                                                                                                                  // 1063
                                                                                                                      // 1063
  if (options.password) {                                                                                             // 1064
    var hashed = hashPassword(options.password);                                                                      // 1065
    user.services.password = {                                                                                        // 1066
      bcrypt: hashed                                                                                                  // 1066
    };                                                                                                                // 1066
  }                                                                                                                   // 1067
                                                                                                                      // 1067
  if (username) user.username = username;                                                                             // 1069
  if (email) user.emails = [{                                                                                         // 1071
    address: email,                                                                                                   // 1072
    verified: false                                                                                                   // 1072
  }]; // Perform a case insensitive check before insert                                                               // 1072
                                                                                                                      // 1074
  checkForCaseInsensitiveDuplicates('username', 'Username', username);                                                // 1075
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', email);                                                // 1076
  var userId = Accounts.insertUserDoc(options, user); // Perform another check after insert, in case a matching user has been
  // inserted in the meantime                                                                                         // 1080
                                                                                                                      // 1080
  try {                                                                                                               // 1081
    checkForCaseInsensitiveDuplicates('username', 'Username', username, userId);                                      // 1082
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, userId);                                      // 1083
  } catch (ex) {                                                                                                      // 1084
    // Remove inserted user if the check fails                                                                        // 1085
    Meteor.users.remove(userId);                                                                                      // 1086
    throw ex;                                                                                                         // 1087
  }                                                                                                                   // 1088
                                                                                                                      // 1088
  return userId;                                                                                                      // 1089
}; // method for create user. Requests come from the client.                                                          // 1090
                                                                                                                      // 1092
                                                                                                                      // 1092
Meteor.methods({                                                                                                      // 1093
  createUser: function (options) {                                                                                    // 1093
    var self = this;                                                                                                  // 1094
    return Accounts._loginMethod(self, "createUser", arguments, "password", function () {                             // 1095
      // createUser() above does more checking.                                                                       // 1101
      check(options, Object);                                                                                         // 1102
      if (Accounts._options.forbidClientAccountCreation) return {                                                     // 1103
        error: new Meteor.Error(403, "Signups forbidden")                                                             // 1105
      }; // Create user. result contains id and token.                                                                // 1104
                                                                                                                      // 1108
      var userId = createUser(options); // safety belt. createUser is supposed to throw on error. send 500 error      // 1109
      // instead of sending a verification email with empty userid.                                                   // 1111
                                                                                                                      // 1111
      if (!userId) throw new Error("createUser failed to insert new user"); // If `Accounts._options.sendVerificationEmail` is set, register
      // a token to verify the user's primary email, and send it to                                                   // 1116
      // that address.                                                                                                // 1117
                                                                                                                      // 1117
      if (options.email && Accounts._options.sendVerificationEmail) Accounts.sendVerificationEmail(userId, options.email); // client gets logged in as the new user afterwards.
                                                                                                                      // 1121
      return {                                                                                                        // 1122
        userId: userId                                                                                                // 1122
      };                                                                                                              // 1122
    });                                                                                                               // 1123
  }                                                                                                                   // 1125
}); // Create user directly on the server.                                                                            // 1093
//                                                                                                                    // 1128
// Unlike the client version, this does not log you in as this user                                                   // 1129
// after creation.                                                                                                    // 1130
//                                                                                                                    // 1131
// returns userId or throws an error if it can't create                                                               // 1132
//                                                                                                                    // 1133
// XXX add another argument ("server options") that gets sent to onCreateUser,                                        // 1134
// which is always empty when called from the createUser method? eg, "admin:                                          // 1135
// true", which we want to prevent the client from setting, but which a custom                                        // 1136
// method calling Accounts.createUser could set?                                                                      // 1137
//                                                                                                                    // 1138
                                                                                                                      // 1138
Accounts.createUser = function (options, callback) {                                                                  // 1139
  options = _.clone(options); // XXX allow an optional callback?                                                      // 1140
                                                                                                                      // 1142
  if (callback) {                                                                                                     // 1143
    throw new Error("Accounts.createUser with callback not supported on the server yet.");                            // 1144
  }                                                                                                                   // 1145
                                                                                                                      // 1145
  return createUser(options);                                                                                         // 1147
}; ///                                                                                                                // 1148
/// PASSWORD-SPECIFIC INDEXES ON USERS                                                                                // 1151
///                                                                                                                   // 1152
                                                                                                                      // 1152
                                                                                                                      // 1152
Meteor.users._ensureIndex('services.email.verificationTokens.token', {                                                // 1153
  unique: 1,                                                                                                          // 1154
  sparse: 1                                                                                                           // 1154
});                                                                                                                   // 1154
                                                                                                                      // 1153
Meteor.users._ensureIndex('services.password.reset.token', {                                                          // 1155
  unique: 1,                                                                                                          // 1156
  sparse: 1                                                                                                           // 1156
});                                                                                                                   // 1156
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/accounts-password/email_templates.js");
require("./node_modules/meteor/accounts-password/password_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();

//# sourceMappingURL=accounts-password.js.map
