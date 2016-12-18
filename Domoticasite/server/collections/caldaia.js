Caldaia.allow({
	insert: function (userId, doc) {
		return Caldaia.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Caldaia.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Caldaia.userCanRemove(userId, doc);
	}
});

Caldaia.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Caldaia.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Caldaia.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Caldaia.before.remove(function(userId, doc) {
	
});

Caldaia.after.insert(function(userId, doc) {
	
});

Caldaia.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Caldaia.after.remove(function(userId, doc) {
	
});
