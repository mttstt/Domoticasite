var pageSession = new ReactiveDict();

Template.CronotermostatoModifica.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.CronotermostatoModifica.events({
	
});

Template.CronotermostatoModifica.helpers({
	
});

Template.CronotermostatoModificaModificaForm.rendered = function() {
	

	pageSession.set("cronotermostatoModificaModificaFormInfoMessage", "");
	pageSession.set("cronotermostatoModificaModificaFormErrorMessage", "");

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

Template.CronotermostatoModificaModificaForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cronotermostatoModificaModificaFormInfoMessage", "");
		pageSession.set("cronotermostatoModificaModificaFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var cronotermostatoModificaModificaFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(cronotermostatoModificaModificaFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cronotermostatoModificaModificaFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cronotermostato", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cronotermostatoModificaModificaFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("cronotermostatoUpdate", t.data.cronotermostato_dettaglio._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("cronotermostato", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.CronotermostatoModificaModificaForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cronotermostatoModificaModificaFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cronotermostatoModificaModificaFormErrorMessage");
	}
	
});
