"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.login = function() {
		AuthFactory.authWithProvider()
		.then(function(user) {
			HeroFactory.checkFirstTimeUser(user.user.uid)
			.then(function(usersHeros) {
 				Object.keys(usersHeros).length === 0 ? $location.url("/tracker/newHero") : $location.url("/tracker/hero"); 
			});
		});
	};

});