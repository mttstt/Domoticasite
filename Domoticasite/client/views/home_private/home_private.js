Template.HomePrivate.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});
