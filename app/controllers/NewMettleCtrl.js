"use strict";

app.controller("NewMettleCtrl", function($scope, AuthFactory, HeroFactory, $location) {

	$scope.addNewMettle = function() {
		$scope.newMettle.uid = AuthFactory.getUser();
		HeroFactory.postNewMettle($scope.newMettle)
		.then(function() {
			$location.url("/tracker/hero");
		});
	};

	$scope.newMettle = {
		healthPoints : "",
		damageReduction : "",
		MMinitiation : "",
		armorBonus : "",
		shieldBonus : "",
		sizeMod : "",
		naturalArmor : "",
		deflectionMod : "",
		MMArmor : "",
		baseFort : "",
		magicFort : "",
		MMFort : "",
		baseRef : "",
		magicRef : "",
		MMRef : "",
		baseWill : "",
		magicWill : "",
		MMWill : "",
		baseAttackBonus : "",
		spellResistance : "",
		MMCMB : "",
		MMCMD : "",
		speed : "",
		dodge : false
	};

});