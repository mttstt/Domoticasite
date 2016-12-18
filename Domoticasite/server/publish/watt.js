Meteor.publish("watt_list", function() {
	return Watt.find({}, {});
});

