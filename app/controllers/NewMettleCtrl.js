"use strict";

app.controller("NewMettleCtrl", function($scope, AuthFactory, HeroFactory, $location) {
	$scope.edit = false;
	let editKey = HeroFactory.getEditKey();
	if (editKey) {
		HeroFactory.getMettle(editKey)
		.then(function(obj) {
			$scope.newMettle = obj;
			$scope.edit = true;
		});
	}


	$scope.addNewMettle = function() {
		for (let item in $scope.newMettle) {
			if ($scope.newMettle[item] === null) {
			$scope.newMettle[item] = 0;
			}
		}
		$scope.newMettle.uid = AuthFactory.getUser();
		HeroFactory.postNewMettle($scope.newMettle)
		.then(function() {
			$location.url("/tracker/newSkill");
		});
	};

	$scope.editMettle = function() {
		HeroFactory.putMettle($scope.newMettle)
		.then(function() {
			$location.url("/tracker/newSkill");
		});
	};

	$scope.newMettle = {
		healthPoints : null,
		damageReduction : null,
		hitDice : null,
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