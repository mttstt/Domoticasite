Cronotermostato.allow({
	insert: function (userId, doc) {
		return Cronotermostato.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Cronotermostato.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Cronotermostato.userCanRemove(userId, doc);
	}
});

Cronotermostato.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Cronotermostato.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Cronotermostato.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Cronotermostato.before.remove(function(userId, doc) {
	
});

Cronotermostato.after.insert(function(userId, doc) {
	
});

Cronotermostato.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Cronotermostato.after.remove(function(userId, doc) {
	
});
