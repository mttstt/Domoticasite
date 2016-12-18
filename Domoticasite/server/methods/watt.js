Meteor.methods({
	"wattInsert": function(data) {
		return Watt.insert(data);
	},
	"wattUpdate": function(id, data) {
		Watt.update({ _id: id }, { $set: data });
	},
	"wattRemove": function(id) {
		Watt.remove({ _id: id });
	}
});
