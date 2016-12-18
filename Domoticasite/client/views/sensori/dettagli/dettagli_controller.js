this.SensoriDettagliController = RouteController.extend({
	template: "SensoriDettagli",
	

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
			Meteor.subscribe("sensore_dettaglio", this.params.sensoreId)
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
			sensore_dettaglio: Sensori.findOne({_id:this.params.sensoreId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});