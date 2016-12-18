Template.Webcam.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Webcam.events({
	
});

Template.Webcam.helpers({
	
});

