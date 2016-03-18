var app = angular.module("pawpawHotel", ["ngRoute", "ngResource"]);

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
	.when("/gHotel", {
		templateUrl: "client/views/templates/hotel.html",
		controller: "Searching",
	})
	.when("/search", {
		templateUrl: "client/views/templates/search.html",
		controller: "Searching",
	})
});