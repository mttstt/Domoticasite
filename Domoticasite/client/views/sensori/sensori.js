var pageSession = new ReactiveDict();

Template.Sensori.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Sensori.events({
	
});

Template.Sensori.helpers({
	
});

var SensoriViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SensoriViewSearchString");
	var sortBy = pageSession.get("SensoriViewSortBy");
	var sortAscending = pageSession.get("SensoriViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = [];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var SensoriViewExport = function(cursor, fileType) {
	var data = SensoriViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.SensoriView.rendered = function() {
	pageSession.set("SensoriViewStyle", "table");
	
};

Template.SensoriView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("SensoriViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("SensoriViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("SensoriViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("sensori.inserisci", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		SensoriViewExport(this.sensori_lista, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		SensoriViewExport(this.sensori_lista, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		SensoriViewExport(this.sensori_lista, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		SensoriViewExport(this.sensori_lista, "json");
	}

	
});

Template.SensoriView.helpers({

	"insertButtonClass": function() {
		return Sensori.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.sensori_lista || this.sensori_lista.count() == 0;
	},
	"isNotEmpty": function() {
		return this.sensori_lista && this.sensori_lista.count() > 0;
	},
	"isNotFound": function() {
		return this.sensori_lista && pageSession.get("SensoriViewSearchString") && SensoriViewItems(this.sensori_lista).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SensoriViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("SensoriViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("SensoriViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("SensoriViewStyle") == "gallery";
	}

	
});


Template.SensoriViewTable.rendered = function() {
	
};

Template.SensoriViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("SensoriViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SensoriViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SensoriViewSortAscending") || false;
			pageSession.set("SensoriViewSortAscending", !sortAscending);
		} else {
			pageSession.set("SensoriViewSortAscending", true);
		}
	}
});

Template.SensoriViewTable.helpers({
	"tableItems": function() {
		return SensoriViewItems(this.sensori_lista);
	}
});


Template.SensoriViewTableItems.rendered = function() {
	
};

Template.SensoriViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("sensori.dettagli", mergeObjects(Router.currentRouteParams(), {sensoreId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("sensoriUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Sensori.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("sensori.modifica", mergeObjects(Router.currentRouteParams(), {sensoreId: this._id}));
		return false;
	}
});

Template.SensoriViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Sensori.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Sensori.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
