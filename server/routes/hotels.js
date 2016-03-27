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

router.post('/hotel',function(req,res,next){
  knex("users").where('email', req.body.user.email).first().then(function(user){
    if(!user) {
      var hash = bcrypt.hashSync(req.body.user.password, 8);
      knex("users").returning('*').insert({
          name: req.body.user.name,
          phone: req.body.user.phone,
          email: req.body.user.email,
          password: hash
        },'*').then(function(user){
          knex("reservations").insert
            ({
              user_id: user[0].id,
              hotel_id: req.body.hotel[0].id,
              room_type: req.body.hotel[0].room_Rate.room_detail[0].room_type, 
              rate_paid: req.body.hotel[0].room_Rate.room_detail[0].rate.oneSize,
              pet_type: req.body.request.numDog.value,
              checkin: req.body.request.checkin,
              checkout: req.body.request.checkout,
            }).catch(function(error) {
                console.log("err")
                console.log(error)
            })
            // console.log(user)
          })
          console.log("created new user")
    } else {
      console.log(user)
      knex("reservations").insert
      ({
        user_id: user.id,
        hotel_id: req.body.hotel[0].id,
        room_type: req.body.hotel[0].room_Rate.room_detail[0].room_type, 
        rate_paid: req.body.hotel[0].room_Rate.room_detail[0].rate.oneSize,
        pet_type: req.body.request.numDog.value,
        checkin: req.body.request.checkin,
        checkout: req.body.request.checkout,
      }).catch(function(error) {
          console.log("err")
          console.log(error)
       })
      console.log("found the existing user")
      console.log(user)
      res.json(user)
    }
  });
});

module.exports = router;