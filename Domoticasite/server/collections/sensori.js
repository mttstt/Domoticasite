Sensori.allow({
	insert: function (userId, doc) {
		return Sensori.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Sensori.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Sensori.userCanRemove(userId, doc);
	}
});

Sensori.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Sensori.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Sensori.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Sensori.before.remove(function(userId, doc) {
	
});

Sensori.after.insert(function(userId, doc) {
	
});

Sensori.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Sensori.after.remove(function(userId, doc) {
	
});
