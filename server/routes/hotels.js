var express = require('express'),
    router 	= express.Router(),
    knex 	  = require('../../db/knex'),
    Yelp 	  = require('yelp'),
    bcrypt  = require('bcrypt');

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
  Hotels().where({city:hotelSearch[0]}).then(function(data){
    res.json(data);
  })
  
});

router.get('/hotel/:id', function(req, res) {
  Hotels().where({id: req.params.id}).then(function(data) {
    res.json(data);
  })
});

router.post('/hotel',function(req,res){
  console.log(req.body);
  // knex("users").where({id:req.body.user.email}).then(function(user){
  //   if(!user){
  //     var hash = bcrypt.hashSync(req.body.password, 8);
  //     knex('users').insert({
  //         name: req.body.user.name,
  //         phone: req.body.user.phone,
  //         email: req.body.user.email,
  //         password: hash
  //       });
  //   } else {
  //     knex("reservations").insert
  //     ({
  //       user_id: req.body.user.id,
  //       hotel_id: req.body.hotel.id,
  //       room_type: req.body.hotel.room_Rate, 
  //       rate_paid: req.body.hotel.room_Rate,
  //       pet_type: req.body.request.numDog,
  //       checkin: req.body.request.checkin,
  //       checkout: req.body.request.checkout,
  //     })
  //   }
  // });
});

module.exports = router;