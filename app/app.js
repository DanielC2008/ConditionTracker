"use strict";

const app = angular.module("tracker", ["ngRoute"])
.constant("FirebaseURL", "https://condition-tracker.firebaseio.com/");


app.config(function($routeProvider, FBCreds) {
		let authConfig = {
		apiKey: FBCreds.apiKey,
		authDomain: FBCreds.authDomain
	};
	firebase.initializeApp(authConfig);

$routeProvider.
when("/login", {
	templateUrl: "partials/login.html",
	controller: "LoginCtrl"
}).
when("/tracker/hero", {
	templateUrl: "partials/hero.html",
	controller: "HeroCtrl"
}).
otherwise("/login");


});