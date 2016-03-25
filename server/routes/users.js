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
      }, 'id').then(function(id) {
        res.cookie('userID', id[0], { signed: true });
        res.redirect('/');
      });
    } 
    else {
      res.status(409);
      res.redirect('login?error=You have already signed up. Please login.');
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
      if(bcrypt.compareSync(req.body.password, user.password)) {
        res.cookie('userID', user.id, { signed: true });
        res.redirect('/profile');
      } else {
        res.redirect('/profile?error=Invalid Email or Password.');
      }
    }
    else {
      res.redirect('/signup?error=Invalid Email or Password.');
    }
  });
});

router.get('/profile', function(req,res){
  console.log(req.signedCookies.userID) 
    var id = req.signedCookies.userID;
    // knex.('users').innerJoin('accounts', 'users.id', 'accounts.user_id')
    knex.select('*').from('reservations').leftOuterJoin('users', 'reservations.id', 'users.user_id').
    where({user_id:id}).then(function(user){
      if(!user){
        res.redirect('/users/login');
      } else {
        console.log(user)
        res.json(user);
      }
    });
  });


module.exports = router;