var express 		      = require("express"),
	  app 			        = express(),
	  bodyParser 		    = require("body-parser"),
	  morgan      	    = require("morgan"),
	  Yelp              = require('yelp');
	  path 			        = require('path'),
	  knex 			        = require('../db/knex'),
	  passport 		      = require('passport'),
	  FacebookStrategy	= require('passport-facebook').Strategy;
	  config            = require('../oauth.js');
    google            = require('googleapis');
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
  clientID: process.env.FBCLIENTID,
  clientSecret: process.env.FBCLIENTSECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
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

var hotelRoute = require('./routes/hotels');
var users = require('./routes/users');
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

app.get('/google',function(req,res){

});

app.use('/search', hotelRoute);

app.use('/', users);
 


var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});



