Meteor.methods({
	"logpulseInsert": function(data) {
		return Logpulse.insert(data);
	},
	"logpulseUpdate": function(id, data) {
		Logpulse.update({ _id: id }, { $set: data });
	},
	"logpulseRemove": function(id) {
		Logpulse.remove({ _id: id });
	}
});
