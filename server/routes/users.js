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

router.post('/signup', function(req,res){

});

router.get('/login', function(req,res){

});

router.post('/login', function(req,res){
	
});

router.get('/profile', function(req,res){

});

module.exports = router;