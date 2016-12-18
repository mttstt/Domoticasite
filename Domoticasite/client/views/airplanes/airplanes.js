Template.Airplanes.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Airplanes.events({
	
});

Template.Airplanes.helpers({
	
});

