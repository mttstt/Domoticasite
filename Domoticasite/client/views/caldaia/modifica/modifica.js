var pageSession = new ReactiveDict();

Template.CaldaiaModifica.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.CaldaiaModifica.events({
	
});

Template.CaldaiaModifica.helpers({
	
});

Template.CaldaiaModificaModificaForm.rendered = function() {
	

	pageSession.set("caldaiaModificaModificaFormInfoMessage", "");
	pageSession.set("caldaiaModificaModificaFormErrorMessage", "");

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

Template.CaldaiaModificaModificaForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("caldaiaModificaModificaFormInfoMessage", "");
		pageSession.set("caldaiaModificaModificaFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var caldaiaModificaModificaFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(caldaiaModificaModificaFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("caldaiaModificaModificaFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("caldaia", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("caldaiaModificaModificaFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("caldaiaUpdate", t.data.caldaia_dettaglio._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("caldaia", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CaldaiaModificaModificaForm.helpers({
	"infoMessage": function() {
		return pageSession.get("caldaiaModificaModificaFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("caldaiaModificaModificaFormErrorMessage");
	}
	
});
