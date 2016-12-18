this.Sensori = new Mongo.Collection("sensori");

this.Sensori.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

this.Sensori.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","user"]);
};

this.Sensori.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Sensori = new SimpleSchema({
	ip: {
		label: "IP",
		type: String
	},
	location: {
		label: "Location",
		type: String,
		optional: true
	},
	note: {
		label: "Note",
		type: String,
		optional: true
	},
	tipo: {
		label: "Tipo",
		type: String,
		optional: true
	},
	temp: {
		label: "Temperature",
		type: Number,
		decimal: true,
		optional: true
	},
	hum: {
		label: "Humidity",
		type: Number,
		decimal: true,
		optional: true
	},
	active: {
		label: "Attivo?",
		type: Boolean,
		optional: true
	},
	timescheduler: {
		label: "Schedulazione lettura dati  (secondi)",
		type: Number,
		optional: true
	},
	on: {
		label: "Acceso?",
		type: Boolean,
		optional: true
	}
});

this.Sensori.attachSchema(this.Schemas.Sensori);
