"use strict";

app.controller("NewAbilityCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewAbility = function() {
		$scope.newAbility.uid = AuthFactory.getUser();
		HeroFactory.postNewAbility($scope.newAbility)
		.then(function() {
			$location.url("/tracker/newMettle");
		});
	};

	$scope.newAbility = {
		STR : "",
		DEX : "",
		CON : "",
		INT : "",
		WIS : "",
		CHA : ""
	};
});