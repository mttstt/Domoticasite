Meteor.methods({
	"sensoriInsert": function(data) {
		return Sensori.insert(data);
	},
	"sensoriUpdate": function(id, data) {
		Sensori.update({ _id: id }, { $set: data });
	},
	"sensoriRemove": function(id) {
		Sensori.remove({ _id: id });
	}
});
