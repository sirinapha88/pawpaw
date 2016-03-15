var express = require("express");
var router = express.Router();
var passport = require("passport");
var knex = require("../../db/knex");
var bcrypt = require("bcrypt");

var User = function(){
	return knex("users");
};

router.get('/facebook',
	passport.authenticate('facebook'), function(req, res){
		console.log(res);
});

router.get('/facebook/callback',
	passport.authenticate('facebook', {
        successRedirect: '/#',
        failureRedirect: '/'
    })
);

router.get('/logout', function(req, res){
  res.clearCookie('userID');
  res.redirect('/');
});

module.exports = router;