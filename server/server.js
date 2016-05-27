var express 		      = require("express"),
	  app 			        = express(),
	  bodyParser 		    = require("body-parser"),
	  morgan      	    = require("morgan"),
	  Yelp              = require("yelp"),
	  path 			        = require("path"),
	  knex 			        = require("../db/knex"),
	  passport 		      = require("passport"),
	  FacebookStrategy	= require("passport-facebook").Strategy,
    cookieParser      = require("cookie-parser"),
    google            = require("google"),
    request           = require("request");
	  require("dotenv").load();

var Users = function () {
  return knex("users");
};

app.use(passport.initialize());

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
    console.log("in facebook in server")
    // console.log(profile);
    process.nextTick(function () {
      Users().where({facebook_id: profile.id}).then(function(user, err) {
        // if(err)
        //   done(err);
        if(user[0]) {
          console.log("this from process.nextTick")
          console.log(user[0]);
          
          return done(null, user[0]);
        } else {
          Users().insert({facebook_id: profile.id, name: profile.displayName, email: profile.emails}).then(function() {
            Users().where({facebook_id: profile.id}).then(function(data) {
              console.log("data from facebook");
              // console.log(data);
              return done(null, data[0]);
            });
          });
        }
      });
    });
  }
 ));

var hotelRoute = require("./routes/hotels");
var users = require("./routes/users");
var auth = require("./routes/auth");
var gHotel = require("./routes/gHotel");

app.use("/client", express.static(path.join(__dirname, "../client")));
app.use("/js",express.static(path.join(__dirname, "../client/js")));
app.use("/templates",express.static(path.join(__dirname, "../client/js/templates")));
app.use(cookieParser(process.env.SECRET));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.session());

app.use("/search", hotelRoute);
app.use("/auth", auth);
app.use("/", users);

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"../client/views", "index.html"));
});



//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Listening on localhost:", PORT)});



