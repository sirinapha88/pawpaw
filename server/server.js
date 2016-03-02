var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	morgan      	= require("morgan"),
	routes 			= require("./routes"),
	path 			= require('path'),
	knex 			= require('../db/knex'),
	passport 		= require('passport'),
	FacebookStrategy	= require('passport-facebook').Strategy,
	config = require('./oauth.js');
	require('dotenv').load();

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
 