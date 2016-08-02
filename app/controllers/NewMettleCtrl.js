"use strict";

app.controller("NewMettleCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewMettle = function() {
		for (let item in $scope.newMettle) {
			if ($scope.newMettle[item] === null) {
			$scope.newMettle[item] = 0;
			}
		}
		$scope.newMettle.uid = AuthFactory.getUser();
		HeroFactory.postNewMettle($scope.newMettle)
		.then(function() {
			$location.url("/tracker/hero");
		});
	};

	$scope.newMettle = {
		healthPoints : null,
		damageReduction : null,
		MMinitiation : null,
		armorBonus : null,
		shieldBonus : null,
		sizeMod : null,
		naturalArmor : null,
		deflectionMod : null,
		MMArmor : null,
		baseFort : null,
		magicFort : null,
		MMFort : null,
		baseRef : null,
		magicRef : null,
		MMRef : null,
		baseWill : null,
		magicWill : null,
		MMWill : null,
		baseAttackBonus : null,
		spellResistance : null,
		MMCMB : null,
		MMCMD : null,
		speed : null,
		dodge : false
	};

});