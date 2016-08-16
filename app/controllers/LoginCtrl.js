"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.login = function() {
		AuthFactory.authWithProvider()
		.then(function(user) {
			HeroFactory.loginLastHero(user.user.uid)
			.then(function(id) {
 				id === "" ? $location.url("/tracker/newHero") : $location.url("/tracker/hero"); 
			});
		});
	};

});