Rangetemp.allow({
	insert: function (userId, doc) {
		return Rangetemp.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Rangetemp.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Rangetemp.userCanRemove(userId, doc);
	}
});

Rangetemp.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Rangetemp.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Rangetemp.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Rangetemp.before.remove(function(userId, doc) {
	
});

Rangetemp.after.insert(function(userId, doc) {
	
});

Rangetemp.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Rangetemp.after.remove(function(userId, doc) {
	
});
