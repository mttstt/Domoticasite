this.CaldaiaDettagliController = RouteController.extend({
	template: "CaldaiaDettagli",
	

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
			Meteor.subscribe("caldaia_dettaglio", this.params.caldaiaId)
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
			caldaia_dettaglio: Caldaia.findOne({_id:this.params.caldaiaId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});