var express = require('express');
var router 	= express.Router();
var knex 	= require('../../db/knex');
var request = require('request');

var Hotels = function () {
  return knex('hotels');
};

router.get('/', function(req,res){
	var key = process.env.GOOGLEKEY;

	request.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pet+hotel+in+Oakland&key=' + 
	key, function(err, response, body){	

		var input = JSON.parse(body);
		
		for (var i = 0; i < input.results.length; i++) {	
						
			var placeId = input.results[i].place_id;	
								
			request.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + 
			key, function(err, response, body){
				
				var data = JSON.parse(body);
				var hotel = {};
				var images = [];
				var insertHotel = [];
				var splitData = data.result.formatted_address.split(',');
				console.log(splitData.length);
				var splitZip,city,address,address2,zipcode;
				
				if(splitData.length === 4){		
					splitZip = splitData[2].trim().split(' ');
					city = splitData[1].trim();
					address = splitData[0];
					zipCode = splitZip[1];
				} else{
					splitZip = splitData[3].trim().split(' ');
					city = splitData[2].trim();
					address = splitData[0];
					address2 = splitData[1].trim();
					zipCode = splitZip[1];
				}
				
				// hotel.placeId = data.result.place_id
				// hotel.name = data.result.name;
				// hotel.phone = data.result.formatted_phone_number;
				// hotel.address = address;
				// hotel.city = city;
				// hotel.zipcode = zipCode;
				// hotel.rating = data.result.rating;
				// hotel.longitude = data.result.geometry.location.lng;
				// hotel.latitude = data.result.geometry.location.lat;

				// if(typeof(data.result.photos) === "object"){
				// 	for (var j = 0; j < data.result.photos.length; j++) {
				// 		images.push(data.result.photos[j].photo_reference)
				// 		hotel.imgURL = images;
				// 	}
				// }	
				//  else{
				//  	hotel.imgURL = "No image";
				//  }
				
				// insertHotel.push(hotel);
				// console.log(insertHotel);


  				Hotels().where('placeId', data.result.place_id).first().then(function(place){
    			if(!place) {
					Hotels().insert
					({
						placeId: data.result.place_id, 
						name: data.result.name, 
						phone: data.result.formatted_phone_number, 
						address: address, 
						address2: address2, 
						city: city, 
						zipcode: zipCode,
						imgURL: {}, 
						rating: data.result.rating,
						latitude: data.result.geometry.location.lat,
						longitude: data.result.geometry.location.lng,
						room_Rate: {},
						pet_type: ['cat','dog']
					})
					.then(function(response) {
	                    console.log("added in the database");                                         
	                }).catch(function(response) {
	                    console.log(response);                  
	                });
                }
                else{
                	console.log("Already have the data"); 
                }			
			});			
		});	
		}
		res.json(input.results)
	});
});
module.exports = router;