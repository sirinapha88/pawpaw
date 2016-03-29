var express = require('express');
var router 	= express.Router();
var knex 	= require('../../db/knex');
var bcrypt 	= require('bcrypt');

var Users = function () {
  return knex('users');
};

router.get('/signup', function(req,res){
	 res.render('client/views/templates/signup');
});

router.post('/signup', function(req,res,next){
  Users().where('email', req.body.email).first().then(function(user){
    console.log(user);
    if(!user) {
      var hash = bcrypt.hashSync(req.body.password, 8);
      Users().insert({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }, '*').then(function(user) {
        res.cookie('userID', user[0].id, { signed: true });
        console.log("In sign up")
        console.log(user);
        res.json(user);
      });
    } 
    else {
      res.status(409);
      res.redirect('/login');
    }
  });
});

router.get('/login', function(req,res){
	res.render('client/views/templates/login');
});

router.post('/login', function(req,res){
  Users().where({
          email: req.body.email,
    }).first().then(function(user){
      if(user) {
        //bcrypt.compareSync will hash the plain text password and compare
        bcrypt.compareSync(req.body.password, user.password) 
        res.cookie('userID', user.id, { signed: true });
        res.json(user);      
      }
      else {
        res.redirect('/signup');
      }
  });
});

router.get('/profile', function(req,res){
  console.log(req.signedCookies.userID) 
    var id = req.signedCookies.userID;
    knex.select('*','users.name','hotels.name AS hotelName').from('reservations')
    .leftOuterJoin('users', 'reservations.user_id', '=', 'users.id')
    .leftOuterJoin('hotels','reservations.hotel_id', '=', 'hotels.id')
    .where({user_id:id}).then(function(user){
      console.log(user,"user");
      if(!user){
        res.redirect('/users/login');
      } else {  
        console.log(user)      
        res.json(user);
      }
    });
  });


module.exports = router;