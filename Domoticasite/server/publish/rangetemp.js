Meteor.publish("rangetemp_lista", function() {
	return Rangetemp.find({}, {});
});

