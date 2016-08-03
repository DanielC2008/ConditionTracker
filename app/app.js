"use strict";

const app = angular.module("tracker", ["ngRoute"])
.constant("FirebaseURL", "https://condition-tracker.firebaseio.com");


app.config(function($routeProvider, FBCreds) {
		let authConfig = {
		apiKey: FBCreds.apiKey,
		authDomain: FBCreds.authDomain,
		databaseURL: FBCreds.databaseURL
	};
	firebase.initializeApp(authConfig);

$routeProvider.
when("/login", {
	templateUrl: "partials/login.html",
	controller: "LoginCtrl"
}).
when("/tracker/newHero", {
	templateUrl: "partials/new-hero.html",
	controller: "NewHeroCtrl"
}).
when("/tracker/newAbility", {
	templateUrl: "partials/new-ability.html",
	controller: "NewAbilityCtrl"
}).
when("/tracker/newMettle", {
	templateUrl: "partials/new-mettle.html",
	controller: "NewMettleCtrl"
}).
when("/tracker/newSkill", {
	templateUrl: "partials/new-skill.html",
	controller: "NewSkillCtrl"
}).
when("/tracker/hero", {
	templateUrl: "partials/hero.html",
	controller: "HeroCtrl"
}).
otherwise("/login");


});