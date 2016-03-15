var express = require('express');
var router 	= express.Router();
var knex 	= require('../../db/knex');
var request = require('request');

router.get('/', function(req,res){
	var key = process.env.GOOGLEKEY;
	request.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pet+hotel+in+SanFrancisco&key=' + 
	key, function(err, response, body){		
		var input = JSON.parse(body);
			
		for (var i = 0; i < input.results.length; i++) {	
			var insertHotels = [];
			var placeId = input.results[i].place_id;			
			
			request.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + 
			key, function(err, response, body){
				
				var data = JSON.parse(body);
				var hotel = {};
				console.log(data);

				hotel.name = data.result.name;
				hotel.address = data.result.formatted_address;
				hotel.phoneNum =  data.result.formatted_phone_number;
				hotel.imgUrl = data.result.photos;
				
			
				insertHotels.push(hotel);
				
			});
			console.log(insertHotels);
		}
	
		res.json(input.results)
	});
});




module.exports = router;