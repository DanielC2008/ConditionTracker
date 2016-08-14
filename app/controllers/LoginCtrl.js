"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.login = function() {
		AuthFactory.authWithProvider()
		.then(function() {
			HeroFactory.getLastHero()
			.then(function(obj) {
				obj === null ? $location.url("/tracker/newHero") : $location.url("/tracker/hero"); 
			})
		});
	};

});