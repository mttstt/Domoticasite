Meteor.methods({
	"rangetempInsert": function(data) {
		return Rangetemp.insert(data);
	},
	"rangetempUpdate": function(id, data) {
		Rangetemp.update({ _id: id }, { $set: data });
	},
	"rangetempRemove": function(id) {
		Rangetemp.remove({ _id: id });
	}
});
