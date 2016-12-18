Meteor.publish("cronotermostato_lista", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Cronotermostato.find({}, {sort:{dayofweek:1}});
	}
	return this.ready();
});

Meteor.publish("cronotermostato_dettaglio", function(cronotermostatoId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Cronotermostato.find({_id:cronotermostatoId}, {});
	}
	return this.ready();
});

