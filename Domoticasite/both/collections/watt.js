this.Watt = new Mongo.Collection("watt");

this.Watt.userCanInsert = function(userId, doc) {
	return true;
};

this.Watt.userCanUpdate = function(userId, doc) {
	return true;
};

this.Watt.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Watt = new SimpleSchema({
	day: {
		label: "day",
		type: String,
		optional: true
	},
	pulsearr: {
		label: "pulsearr",
		type: [Object],
		blackbox: true,
		optional: true
	},
	solararr: {
		label: "solararr",
		type: [Object],
		blackbox: true,
		optional: true
	}
});

this.Watt.attachSchema(this.Schemas.Watt);
