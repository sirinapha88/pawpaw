var express = require('express'),
    router 	= express.Router(),
    knex 	  = require('../../db/knex'),
    Yelp 	  = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENSECRET
});

var Hotels = function () {
  return knex('hotels');
};

router.get('/:searchString', function(req,res){
  var hotelSearch = req.params.searchString.split(',');
  console.log("this is backend" + hotelSearch[0])
  Hotels().where({city:hotelSearch[0]}).then(function(data){
    
    res.json(data);
  })
  
});

router.get('/hotel/:id', function(req, res) {
  console.log(req.params.id)
  Hotels().where({id: req.params.id}).then(function(data) {
    console.log(data)
    res.json(data);
  })
});

router.post('/hotel',function(req,res){
  console.log(req.params);
});

module.exports = router;