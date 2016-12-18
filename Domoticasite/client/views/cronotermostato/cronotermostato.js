var pageSession = new ReactiveDict();

Template.Cronotermostato.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Cronotermostato.events({
	
});

Template.Cronotermostato.helpers({
	
});

var CronotermostatoViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CronotermostatoViewSearchString");
	var sortBy = pageSession.get("CronotermostatoViewSortBy");
	var sortAscending = pageSession.get("CronotermostatoViewSortAscending");
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

var CronotermostatoViewExport = function(cursor, fileType) {
	var data = CronotermostatoViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CronotermostatoView.rendered = function() {
	pageSession.set("CronotermostatoViewStyle", "table");
	
};

Template.CronotermostatoView.events({
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
				pageSession.set("CronotermostatoViewSearchString", searchString);
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
					pageSession.set("CronotermostatoViewSearchString", searchString);
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
					pageSession.set("CronotermostatoViewSearchString", "");
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
		CronotermostatoViewExport(this.cronotermostato_lista, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CronotermostatoViewExport(this.cronotermostato_lista, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CronotermostatoViewExport(this.cronotermostato_lista, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CronotermostatoViewExport(this.cronotermostato_lista, "json");
	}

	
});

Template.CronotermostatoView.helpers({

	"insertButtonClass": function() {
		return Cronotermostato.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.cronotermostato_lista || this.cronotermostato_lista.count() == 0;
	},
	"isNotEmpty": function() {
		return this.cronotermostato_lista && this.cronotermostato_lista.count() > 0;
	},
	"isNotFound": function() {
		return this.cronotermostato_lista && pageSession.get("CronotermostatoViewSearchString") && CronotermostatoViewItems(this.cronotermostato_lista).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CronotermostatoViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CronotermostatoViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CronotermostatoViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CronotermostatoViewStyle") == "gallery";
	}

	
});


Template.CronotermostatoViewTable.rendered = function() {
	
};

Template.CronotermostatoViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CronotermostatoViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CronotermostatoViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CronotermostatoViewSortAscending") || false;
			pageSession.set("CronotermostatoViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CronotermostatoViewSortAscending", true);
		}
	}
});

Template.CronotermostatoViewTable.helpers({
	"tableItems": function() {
		return CronotermostatoViewItems(this.cronotermostato_lista);
	}
});


Template.CronotermostatoViewTableItems.rendered = function() {
	
};

Template.CronotermostatoViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("cronotermostatoUpdate", this._id, values, function(err, res) {
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
						Cronotermostato.remove({ _id: me._id });
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
		Router.go("cronotermostato.modifica", mergeObjects(Router.currentRouteParams(), {cronotermostatoId: this._id}));
		return false;
	}
});

Template.CronotermostatoViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Cronotermostato.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Cronotermostato.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.Mybutton.helpers({
    "flame": function() {
		console.log('caldaia:',Caldaia.findOne().statocaldaia);
		return Caldaia.findOne().statocaldaia;
	},
	"riscaldamento": function() {
		return Caldaia.findOne().statoriscaldamento;
	},
	"termostato": function() {
		return Caldaia.findOne().statotermostato;
	}
});


Template.Mybutton.events({
		'change input#riscaldamento': function(event) {
			   event.preventDefault();
				 var id = Caldaia.findOne()._id
				 Caldaia.update({_id: id}, {$set:{ statoriscaldamento: event.target.checked }});
		},

		'change input#termostato': function(event) {
			   event.preventDefault();
				 var id = Caldaia.findOne()._id
				 Caldaia.update({_id: id}, {$set:{ statotermostato: event.target.checked }});				 
		}
});

