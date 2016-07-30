"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory) {
	let key = HeroFactory.getHeroKey();

	HeroFactory.getHero(key)
	.then(function(currHero) {
		console.log(currHero);
		$scope.hero = currHero;
	})
	.then(function(){
		HeroFactory.getAbility(key)
		.then(function(currAbility){
			console.log(currAbility);
			$scope.abilities = currAbility;
			$location.url("#/tracker/hero");
		})
	})

	$scope.add = function(a,b) {
		return parseInt(a) + parseInt(b);
	}


});