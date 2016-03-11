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

app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/templates',express.static(path.join(__dirname, '../client/js/templates')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../client/views', 'index.html'));
});

var yelp = new Yelp({
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENSECRET
});

app.get('/search', function(req,res){
  yelp.search({ term: 'dog-hotel', location: 'san-francisco' })
    .then(function (data) {
      console.log(data.businesses[0].name);
      res.json(data.businesses)
  })
  .catch(function (err) {
    console.error(err);
  });
})

 
 


var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});



