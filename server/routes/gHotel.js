var express = require('express');
var router 	= express.Router();
var knex 	= require('../../db/knex');
var request = require('request');

var Hotels = function () {
  return knex('hotels');
};

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
				var splitData = data.result.formatted_address.split(',');
				var splitZip = splitData[2].trim().split(' ');
				var city = splitData[1].trim();
				var address = splitData[0];
				var zipCode = splitZip[1];

				hotel.placeId = data.result.place_id;
				hotel.name = data.result.name;
				hotel.address = address;
				hotel.city = city;
				hotel.zipCode = zipCode;
				hotel.phoneNum =  data.result.formatted_phone_number;
				hotel.imgUrl = data.result.photos;
				
			
				insertHotels.push(hotel);
				console.log(hotel.name);
				
				knex("hotels").where({placeId:hotel.placeId}).then(function(response) {
					if(placeId){
						knex("hotels").insert(hotel);
						 console.log("hello");
					}else{
						console.log("goodbye");
					}
			    });			
			});
			
		}	
		res.json(input.results)
	});
});
module.exports = router;