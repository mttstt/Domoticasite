this.CronotermostatoController = RouteController.extend({
	template: "Cronotermostato",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("cronotermostato_lista"),
			Meteor.subscribe("caldaia_lista")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			cronotermostato_lista: Cronotermostato.find({}, {sort:{dayofweek:1}}),
			caldaia_lista: Caldaia.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});