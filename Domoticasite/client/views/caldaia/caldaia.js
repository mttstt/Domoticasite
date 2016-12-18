var pageSession = new ReactiveDict();

Template.Caldaia.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Caldaia.events({
	
});

Template.Caldaia.helpers({
	
});

var CaldaiaViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CaldaiaViewSearchString");
	var sortBy = pageSession.get("CaldaiaViewSortBy");
	var sortAscending = pageSession.get("CaldaiaViewSortAscending");
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

var CaldaiaViewExport = function(cursor, fileType) {
	var data = CaldaiaViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CaldaiaView.rendered = function() {
	pageSession.set("CaldaiaViewStyle", "table");
	
};

Template.CaldaiaView.events({
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
				pageSession.set("CaldaiaViewSearchString", searchString);
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
					pageSession.set("CaldaiaViewSearchString", searchString);
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
					pageSession.set("CaldaiaViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CaldaiaViewExport(this.caldaia_lista, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CaldaiaViewExport(this.caldaia_lista, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CaldaiaViewExport(this.caldaia_lista, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CaldaiaViewExport(this.caldaia_lista, "json");
	}

	
});

Template.CaldaiaView.helpers({

	"insertButtonClass": function() {
		return Caldaia.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.caldaia_lista || this.caldaia_lista.count() == 0;
	},
	"isNotEmpty": function() {
		return this.caldaia_lista && this.caldaia_lista.count() > 0;
	},
	"isNotFound": function() {
		return this.caldaia_lista && pageSession.get("CaldaiaViewSearchString") && CaldaiaViewItems(this.caldaia_lista).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CaldaiaViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CaldaiaViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CaldaiaViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CaldaiaViewStyle") == "gallery";
	}

	
});


Template.CaldaiaViewTable.rendered = function() {
	
};

Template.CaldaiaViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CaldaiaViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CaldaiaViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CaldaiaViewSortAscending") || false;
			pageSession.set("CaldaiaViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CaldaiaViewSortAscending", true);
		}
	}
});

Template.CaldaiaViewTable.helpers({
	"tableItems": function() {
		return CaldaiaViewItems(this.caldaia_lista);
	}
});


Template.CaldaiaViewTableItems.rendered = function() {
	
};

Template.CaldaiaViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("caldaia.dettagli", mergeObjects(Router.currentRouteParams(), {caldaiaId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("caldaiaUpdate", this._id, values, function(err, res) {
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
						Caldaia.remove({ _id: me._id });
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
		Router.go("caldaia.modifica", mergeObjects(Router.currentRouteParams(), {caldaiaId: this._id}));
		return false;
	}
});

Template.CaldaiaViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Caldaia.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Caldaia.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
