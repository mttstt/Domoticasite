this.Rangetemp = new Mongo.Collection("rangetemp");

this.Rangetemp.userCanInsert = function(userId, doc) {
	return true;
};

this.Rangetemp.userCanUpdate = function(userId, doc) {
	return true;
};

this.Rangetemp.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Rangetemp = new SimpleSchema({
	grado: {
		label: "grado",
		type: Number,
		optional: true
	}
});

this.Rangetemp.attachSchema(this.Schemas.Rangetemp);
