this.Caldaia = new Mongo.Collection("caldaia");

this.Caldaia.userCanInsert = function(userId, doc) {
	return true;
};

this.Caldaia.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","user"]);
};

this.Caldaia.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Caldaia = new SimpleSchema({
	statoriscaldamento: {
		label: "Stato Riscaldamento",
		type: Boolean,
		optional: true
	},
	statotermostato: {
		label: "Stato del Termostato",
		type: Boolean,
		optional: true
	},
	statocaldaia: {
		label: "Stato della Caldaia",
		type: Boolean,
		optional: true
	},
	sensoretermostato: {
		label: "Sensore utilizzato dal termostato",
		type: String,
		optional: true
	},
	timescheduler: {
		label: "Intervallo letture",
		type: Number,
		optional: true,
		defaultValue: 60
	},
	isteresi: {
		label: "Isteresi",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0
	}
});

this.Caldaia.attachSchema(this.Schemas.Caldaia);
