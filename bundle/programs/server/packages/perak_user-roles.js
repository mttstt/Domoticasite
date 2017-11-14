(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;

/* Package-scope variables */
var Users;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/perak_user-roles/both/collections/users.js                                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
Users = Meteor.users;

Users.isInRole = function (userId, role) {
  var user = Users.findOne({_id: userId});
  return !!(user && user.roles && user.roles.indexOf(role) != -1);
};

Users.isInRoles = function (userId, roleList) {
	var user = Users.findOne({_id: userId});
	if(!user || !user.roles) {
		return false;
	}

	var granted = _.intersection(roleList, user.roles);
	if(!granted || granted.length == 0) {
		return false;
	}
	return true;
};

Users.isAdmin = function (userId) {
  return Users.isInRole(userId, "admin");
};

Users.isAdminOrInRole = function (userId, role) {
  return Users.isInRole(userId, "admin") || Users.isInRole(userId, role);
};

//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/perak_user-roles/server/collections/users.js                                //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
// If you want to modify the rights on user updates
// then add a new allow rule in your app.

Users.allow({
	// doesn't allow insert or removal of users from untrusted code
    update: function (userId, doc, fieldNames, modifier) {
        return Users.isAdmin(userId) 
        		// only admins can update user roles via the client
        		|| (doc._id === userId && !_.contains(fieldNames, 'roles'));
    }
});
//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/perak_user-roles/server/publications/admin_user.js                          //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
Meteor.publish("admin_user", function(_id){
	return Users.isAdmin(this.userId) ? Users.find({_id: _id}) : this.ready();
});

//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/perak_user-roles/server/publications/admin_users.js                         //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
Meteor.publish("admin_users", function() {
	return Users.isAdmin(this.userId) ? Meteor.users.find({}, {fields: {profile: 1, roles: 1, emails: 1, stats: 1}}) : this.ready();
});

//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
// packages/perak_user-roles/server/publications/current_user_data.js                   //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
                                                                                        //
Meteor.publish("current_user_data", function () {
	return Meteor.users.find( { _id: this.userId }, { fields: {profile: 1 , roles: 1} } );
});

//////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['perak:user-roles'] = {}, {
  Users: Users
});

})();
