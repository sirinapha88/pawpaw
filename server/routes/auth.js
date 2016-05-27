var express = require("express");
var router = express.Router();
var passport = require("passport");
var knex = require("../../db/knex");
var bcrypt = require("bcrypt");


router.get('/facebook',
	passport.authenticate('facebook'), function(req, res){
		console.log("in Facebook auth route")
		console.log(res);
});

router.get('/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
        console.log("this is usr id " + req.user.facebook_id);
    	if(req.isAuthenticated()){
      		console.log("I am authenticated");
    	}
    res.cookie('userID', req.user.id, { signed: true });
    res.redirect('/#/');
    });

router.get('/logout', function(req, res){
	console.log("in logout ")
	console.log(res.clearCookie)
  	res.clearCookie('id');
  	res.redirect('/');
});

module.exports = router;