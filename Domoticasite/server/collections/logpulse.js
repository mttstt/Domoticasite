Logpulse.allow({
	insert: function (userId, doc) {
		return Logpulse.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Logpulse.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Logpulse.userCanRemove(userId, doc);
	}
});

Logpulse.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Logpulse.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Logpulse.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Logpulse.before.remove(function(userId, doc) {
	
});

Logpulse.after.insert(function(userId, doc) {
	
});

Logpulse.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Logpulse.after.remove(function(userId, doc) {
	
});
