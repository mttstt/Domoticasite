this.Cronotermostato = new Mongo.Collection("cronotermostato");

this.Cronotermostato.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

this.Cronotermostato.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","user"]);
};

this.Cronotermostato.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Cronotermostato = new SimpleSchema({
	day: {
		type: String,
		optional: true
	},
	h001: {
		label: "00-01",
		type: Number,
		optional: true
	},
	h012: {
		label: "01-02",
		type: Number,
		optional: true
	},
	h023: {
		label: "02-03",
		type: Number,
		optional: true
	},
	h034: {
		label: "03-04",
		type: Number,
		optional: true
	},
	h045: {
		label: "04-05",
		type: Number,
		optional: true
	},
	h056: {
		label: "05-06",
		type: Number,
		optional: true
	},
	h067: {
		label: "06-07",
		type: Number,
		optional: true
	},
	h078: {
		label: "07-08",
		type: Number,
		optional: true
	},
	h089: {
		label: "08-09",
		type: Number,
		optional: true
	},
	h0910: {
		label: "09-10",
		type: Number,
		optional: true
	},
	h1011: {
		label: "10-11",
		type: Number,
		optional: true
	},
	h1112: {
		label: "11-12",
		type: Number,
		optional: true
	},
	h1213: {
		label: "12-13",
		type: Number,
		optional: true
	},
	h1314: {
		label: "13-14",
		type: Number,
		optional: true
	},
	h1415: {
		label: "14-15",
		type: Number,
		optional: true
	},
	h1516: {
		label: "15-16",
		type: Number,
		optional: true
	},
	h1617: {
		label: "16-17",
		type: Number,
		optional: true
	},
	h1718: {
		label: "17-18",
		type: Number,
		optional: true
	},
	h1819: {
		label: "18-19",
		type: Number,
		optional: true
	},
	h1920: {
		label: "19-20",
		type: Number,
		optional: true
	},
	h2021: {
		label: "20-21",
		type: Number,
		optional: true
	},
	h2122: {
		label: "21-22",
		type: Number,
		optional: true
	},
	h2223: {
		label: "22-23",
		type: Number,
		optional: true
	},
	h2324: {
		label: "23-24",
		type: Number,
		optional: true
	},
	dayofweek: {
		label: "dayofweek",
		type: Number
	}
});

this.Cronotermostato.attachSchema(this.Schemas.Cronotermostato);
