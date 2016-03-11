var app = angular.module("pawpawHotel", ["ngRoute", "ngResource"]);

app.config(function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "/client/views/templates/landing.html",
		controller: "Landing",
	})
	.when("/login",{
		templateUrl: "client/views/templates/login.html",
		controller: "Login",
	})
	.when("/signup",{
		templateUrl: "client/views/templates/signup.html",
		controller: "Login",
	})
	.when("/dashboard", {
		templateUrl: "client/views/templates/landing.html",
		controller: "Dashboard",
	})
	.when("/search", {
		templateUrl: "client/views/templates/search.html",
		controller: "Searching",
	})
});