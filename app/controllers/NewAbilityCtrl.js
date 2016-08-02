"use strict";

app.controller("NewAbilityCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewAbility = function() {
		for (let item in $scope.newAbility) {
			if ($scope.newAbility[item] === null) {
			$scope.newAbility[item] = 0;
			}
		}
		$scope.newAbility.uid = AuthFactory.getUser();
		HeroFactory.postNewAbility($scope.newAbility)
		.then(function() {
			$location.url("/tracker/newMettle");
		});
	};

	$scope.newAbility = {
		STR : null,
		DEX : null,
		CON : null,
		INT : null,
		WIS : null,
		CHA : null
	};
});