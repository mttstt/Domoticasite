Meteor.methods({
	"cronotermostatoInsert": function(data) {
		return Cronotermostato.insert(data);
	},
	"cronotermostatoUpdate": function(id, data) {
		Cronotermostato.update({ _id: id }, { $set: data });
	},
	"cronotermostatoRemove": function(id) {
		Cronotermostato.remove({ _id: id });
	}
});
