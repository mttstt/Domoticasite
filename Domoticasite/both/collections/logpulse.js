this.Logpulse = new Mongo.Collection("logpulse");

this.Logpulse.userCanInsert = function(userId, doc) {
	return true;
};

this.Logpulse.userCanUpdate = function(userId, doc) {
	return true;
};

this.Logpulse.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Logpulse = new SimpleSchema({
	counter: {
		label: "counter",
		type: Number,
		optional: true
	}
});

this.Logpulse.attachSchema(this.Schemas.Logpulse);
