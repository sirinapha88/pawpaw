var app = angular.module("pawpawHotel", ["ngRoute", "ngAnimate", "ngResource"]);

app.config(function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "client/views/templates/index.html",
		controller: "Landing",
	})
	.when("/login",{
		templateUrl: "client/views/templates/login.html",
		controller: "Login",
	}).when("/dashboard", {
		templateUrl: "client/views/templates/landing.html",
		controller: "Dashboard",
	})
});