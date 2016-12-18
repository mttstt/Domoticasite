this.SensoriInserisciController = RouteController.extend({
	template: "SensoriInserisci",
	

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
			Meteor.subscribe("sensori_vuoto")
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
			sensori_vuoto: Sensori.findOne({ip:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});