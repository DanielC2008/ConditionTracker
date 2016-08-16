"use strict";

app.controller("NewHeroCtrl", function($scope, AuthFactory, HeroFactory, $location) {
	$scope.edit = false;
	let editKey = HeroFactory.getEditKey();
	if (editKey) {
		HeroFactory.getHero(editKey.id)
		.then(function(obj) {
			$scope.newHero = obj;
			$scope.edit = true;
		});
	}

	$scope.addNewHero = function() {
		$scope.newHero.uid = AuthFactory.getUser();
		HeroFactory.postNewHero($scope.newHero)
		.then(function(obj) {
			HeroFactory.putLastHero(obj.name)
			.then(function() {
				$location.url("/tracker/newAbility");
			});
		});
	};

	$scope.editHero = function() {
		HeroFactory.putHero($scope.newHero)
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