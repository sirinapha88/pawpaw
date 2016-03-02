var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	morgan      	= require("morgan"),
	Yelp = require('yelp');
	path 			= require('path'),
	knex 			= require('../db/knex'),
	passport 		= require('passport'),
	FacebookStrategy	= require('passport-facebook').Strategy;
	config = require('../oauth.js');
	// require('dotenv').load();

var Users = function () {
  return knex('users');
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    process.nextTick(function () {
      Users().where({facebook_id: profile.id}).then(function(user, err) {
        if(err)
          done(err);
        if(user[0]) {
          return done(null, user[0]);
        } else {
          Users().insert({facebook_id: profile.id, name: profile.displayName, email: profile.emails}).then(function() {
            Users().where({facebook_id: profile.id}).then(function(data) {
              return done(null, data[0]);
            });
          });
        }
      });
    });
  }
 ));


var yelp = new Yelp({
  consumer_key: 'Kdfe5smuWY0MTrYmBspPxw',
  consumer_secret: 'PFBFDxJrFsA4yxys4GAUMS6bqXU',
  token: 'I3lxcR-nt3w8l8_s4hC7U30m-2YMXPwz',
  token_secret: 'I-fUcPniWYQJ930zrgt_mYETpVQ',
});
 
 yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data.businesses[0]);
})
.catch(function (err) {
  console.error(err);
});