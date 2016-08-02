"use strict";

app.controller("NewHeroCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewHero = function() {
		$scope.newHero.uid = AuthFactory.getUser();
		HeroFactory.postNewHero($scope.newHero)
		.then(function() {
			$location.url("/tracker/newAbility");
		});
	};

	$scope.newHero = {
		characterName : "",
		alignment : "",
		level : "",
		deity : "",
		homeland : "",
		race : "",
		size : "",
		age : "",
		gender : "",
		height : "",
		weight : "",
		hair : "",
		eyes : "",
	};
});