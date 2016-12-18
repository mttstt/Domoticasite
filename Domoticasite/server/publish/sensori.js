Meteor.publish("sensori_lista", function() {
	return Sensori.find({}, {});
});

Meteor.publish("sensore_dettaglio", function(sensoreId) {
	return Sensori.find({_id:sensoreId}, {});
});

Meteor.publish("sensori_vuoto", function() {
	return Sensori.find({ip:null}, {});
});

Meteor.publish("sensori_temp_lista", function() {
	return Sensori.find({tipo:"DHT22"}, {});
});

