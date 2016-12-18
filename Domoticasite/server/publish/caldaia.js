Meteor.publish("caldaia_dettaglio", function(caldaiaId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Caldaia.find({_id:caldaiaId}, {});
	}
	return this.ready();
});

Meteor.publish("caldaia_lista", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Caldaia.find({}, {});
	}
	return this.ready();
});

