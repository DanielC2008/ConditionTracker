"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory) {
	
	HeroFactory.getHero()
	.then(function(currHero) {
		console.log(currHero);
		$scope.hero = currHero[0];
		$location.url("#/tracker/hero");
	});


});