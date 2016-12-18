this.CronotermostatoModificaController = RouteController.extend({
	template: "CronotermostatoModifica",
	

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
			Meteor.subscribe("rangetemp_lista"),
			Meteor.subscribe("cronotermostato_dettaglio", this.params.cronotermostatoId)
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
			rangetemp_lista: Rangetemp.find({}, {}),
			cronotermostato_dettaglio: Cronotermostato.findOne({_id:this.params.cronotermostatoId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});