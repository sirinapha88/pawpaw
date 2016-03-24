var app = angular.module("pawpawHotel", ["ngRoute", "ngResource","ngAutocomplete","ngAnimate"]);

app.config(function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "/client/views/templates/landing.html",
		controller: "Searching",
	})
	.when("/login",{
		templateUrl: "client/views/templates/login.html",
		controller: "LoginCtrl",
	})
	.when("/signup",{
		templateUrl: "client/views/templates/signup.html",
		controller: "SignupCtrl",
	})
	.when("/Hotels", {
		templateUrl: "client/views/templates/Hotels.html",
		controller: "HotelList",
	})
	.when('/hotel/:id', {
		templateUrl: "client/views/templates/hotelDetails.html",
		controller: "HotelDetail"
	})
	.when('/hotel', {
		templateUrl: "client/views/templates/booking.html",
		controller: "HotelDetail"
	})
	.when("/booking", {
		templateUrl: "client/views/templates/booking.html",
		controller: "BookingCtrl"
	})
	.when("/complete", {
		templateUrl: "client/views/templates/complete.html",
		controller: "Searching"
	})
	
});