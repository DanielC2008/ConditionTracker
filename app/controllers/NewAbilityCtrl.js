"use strict";

app.controller("NewAbilityCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewAbility = function() {
		$scope.newAbility.uid = AuthFactory.getUser();
		HeroFactory.postNewAbility($scope.newAbility)
		.then(function() {
			$location.url("/tracker/hero");
		});
	};

	$scope.newAbility = {
		strength : "",
		dexterity : "",
		constitution : "",
		intelligence : "",
		wisdom : ""
	};
});