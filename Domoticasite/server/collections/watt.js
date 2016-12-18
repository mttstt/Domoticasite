Watt.allow({
	insert: function (userId, doc) {
		return Watt.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Watt.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Watt.userCanRemove(userId, doc);
	}
});

Watt.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Watt.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Watt.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Watt.before.remove(function(userId, doc) {
	
});

Watt.after.insert(function(userId, doc) {
	
});

Watt.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Watt.after.remove(function(userId, doc) {
	
});
