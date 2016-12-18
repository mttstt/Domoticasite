var pageSession = new ReactiveDict();

Template.SensoriDettagli.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.SensoriDettagli.events({
	
});

Template.SensoriDettagli.helpers({
	
});

Template.SensoriDettagliDettagliForm.rendered = function() {
	

	pageSession.set("sensoriDettagliDettagliFormInfoMessage", "");
	pageSession.set("sensoriDettagliDettagliFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.SensoriDettagliDettagliForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("sensoriDettagliDettagliFormInfoMessage", "");
		pageSession.set("sensoriDettagliDettagliFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var sensoriDettagliDettagliFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(sensoriDettagliDettagliFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("sensoriDettagliDettagliFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("sensoriDettagliDettagliFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("sensori", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("sensori", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.SensoriDettagliDettagliForm.helpers({
	"infoMessage": function() {
		return pageSession.get("sensoriDettagliDettagliFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("sensoriDettagliDettagliFormErrorMessage");
	}
	
});
