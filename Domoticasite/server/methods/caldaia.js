Meteor.methods({
	"caldaiaInsert": function(data) {
		return Caldaia.insert(data);
	},
	"caldaiaUpdate": function(id, data) {
		Caldaia.update({ _id: id }, { $set: data });
	},
	"caldaiaRemove": function(id) {
		Caldaia.remove({ _id: id });
	}
});
