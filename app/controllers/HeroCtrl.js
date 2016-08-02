"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory, $timeout) {

	let key = HeroFactory.getHeroKey();	


	HeroFactory.getHero(key)
	.then(function(currHero) {
		$scope.hero = currHero;
	})

	HeroFactory.getAbility(key)
	.then(function(currAbility){
		$scope.getMod(currAbility);
		$scope.abilities = currAbility;
	})
	
	HeroFactory.getMettle(key)
	.then(function(currMettle) {
		$scope.mettle = currMettle;
		$scope.mettle.currHealth =$scope.mettle.healthPoints;
		$scope.tempFortMod = 0;
		$scope.tempRefMod = 0;
		$scope.tempWillMod = 0;
		$scope.tempCMB = 0;
		$scope.tempCMD = 0;
		if ($scope.mettle.dodge){
			$scope.mettle.dodgeBonus = 1 ;
		}
		$location.url("#/tracker/hero");
	})


	$scope.getMod = function(abilities) {
		abilities.splice(6,2);
		abilities.forEach(function(currObj, index) {
			for (let ability in currObj) {
				if (index === 0) {
					$scope.CHA   = Math.floor(parseInt(currObj[ability])/2) -5;
				}
				if (index === 1) {
					$scope.CON  = Math.floor(parseInt(currObj[ability])/2) -5;
				}
				if (index === 2) {
					$scope.DEX  = Math.floor(parseInt(currObj[ability])/2) -5;
				}
				if (index === 3) {
					$scope.INT  = Math.floor(parseInt(currObj[ability])/2) -5;
				}
				if (index === 4) {
					$scope.STR  = Math.floor(parseInt(currObj[ability])/2) -5;
				}
				if (index === 5) {
					$scope.WIS  = Math.floor(parseInt(currObj[ability])/2) -5;
				}
			}
		});
	};

	$scope.add = function(a, b) {
		return parseInt(a) + parseInt(b);
	};

	$scope.applyChange = function(change) {
		$scope.mettle.currHealth = parseInt($scope.mettle.currHealth) - parseInt(change); 
		$scope.healthChange = null;
	};

	$scope.tempMod = function(key, temp) {
		console.log(temp);
			if (key == 'CHA') {
				$scope.CHA = parseInt($scope.CHA) + parseInt(temp);
			}
			if (key == 'CON') {
				$scope.CON = parseInt($scope.CON) + parseInt(temp);
			}
			if (key == 'DEX') {
				$scope.DEX = parseInt($scope.DEX) + parseInt(temp);
			}
			if (key == 'INT') {
				$scope.INT = parseInt($scope.INT) + parseInt(temp);
			}
			if (key == 'STR') {
				$scope.STR = parseInt($scope.STR) + parseInt(temp);
			}
			if (key == 'WIS') {
				$scope.WIS = parseInt($scope.WIS) + parseInt(temp);
			}
	}

// ARMOR CLASS//////////////////////
	$scope.getAC = function() {
		return  10 +
						parseInt($scope.mettle.armorBonus) +
						parseInt($scope.mettle.shieldBonus) +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.naturalArmor) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor) +
						parseInt($scope.DEX);
	};

	$scope.touchAC = function() {
		return  10 +
						parseInt($scope.mettle.armorBonus) +
						parseInt($scope.mettle.shieldBonus) +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.naturalArmor) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor)
	};

		$scope.flatFooted = function() {
		return  10 +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor) +
						parseInt($scope.DEX);
	};

// SAVING THROWS//////////////////////
	$scope.getFort = function() {
		let fortMod = $scope.tempFortMod;
		if (fortMod === ""){
			fortMod = 0;
		}
		return  parseInt($scope.mettle.baseFort) +
						parseInt($scope.mettle.magicFort) +
						parseInt($scope.mettle.MMFort) +
						parseInt($scope.CON) +
						parseInt(fortMod);


	};

	$scope.getRef = function() {
		let refMod = $scope.tempRefMod;
		if (refMod === ""){
			refMod = 0;
		}
		return	parseInt($scope.mettle.baseRef) +
						parseInt($scope.mettle.magicRef) +
						parseInt($scope.mettle.MMRef) +
						parseInt($scope.DEX) +
						parseInt(refMod);

	};

	$scope.getWill = function() {
		let willMod = $scope.tempWillMod;
		if (willMod === ""){
			willMod = 0;
		}
		return  parseInt($scope.mettle.baseWill) +
						parseInt($scope.mettle.magicWill) +
						parseInt($scope.mettle.MMWill) +
						parseInt($scope.WIS) +
						parseInt(willMod);
	};

// COMBAT MANUEVERS//////////////////////
	$scope.getCMB = function() {
		let CMBMod = $scope.tempCMB;
		if (CMBMod === ""){
			CMBMod = 0;
		}
		return  parseInt($scope.mettle.baseAttackBonus) +
						parseInt($scope.STR) +
						parseInt($scope.mettle.sizeMod) +
						parseInt(CMBMod);
	};

	$scope.getCMD = function() {
		let CMDMod = $scope.tempCMD;
		if (CMDMod === ""){
			CMDMod = 0;
		}
		return  10 +
						parseInt($scope.mettle.baseAttackBonus) +
						parseInt($scope.STR) +
						parseInt($scope.DEX) +
						parseInt($scope.mettle.sizeMod) +
						parseInt(CMDMod);
	};


});