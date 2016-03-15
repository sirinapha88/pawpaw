var express = require('express');
var router 	= express.Router();
var knex 	= require('../../db/knex');
// var google = require('google');
var request = require('request');

// google.resultsPerPage = 10
// var nextCounter = 0

// google('pet hotel', function (err, res){
//   if (err) console.error(err)
//   	console.log(res.links)

  // for (var i = 0; i < res.links.length; ++i) {
  //   var link = res.links[i];
  //   console.log(link.title + ' - ' + link.href)
  //   console.log(link.description + "\n")
  // }

  // if (nextCounter < 4) {
  //   nextCounter += 1
  //   if (res.next) res.next()
  // }
// })

router.get('/', function(req,res){
	var key = process.env.GOOGLEKEY;
	request.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pet+hotel+in+SanFrancisco&key=' + 
		key, function(err, response, body){
		
		var input = JSON.parse(body);
		
		console.log(input.results[1].photos[0]);
		res.json(input.results)
	});
});




module.exports = router;