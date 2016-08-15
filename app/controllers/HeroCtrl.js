"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory, ConditionFactory, ConditionSrv) {
//////////////VARIABLES///////////////////
		// reset for conditions
	$scope.originalSpeed = null;
	$scope.originalDEX = null;
	$scope.originalSTR = null;
	$scope.originalConChange = "";
	// only show conditions if charcter clicked
	$scope.inflictedConditions = [];
	// establishing text for bottom modal
	$scope.text = null;
	// initializing modals
	$('.modal-trigger').leanModal();
	$(".button-collapse").sideNav();
	

	HeroFactory.getLastHero()
	.then(function(){
		let key = HeroFactory.getHeroKey();
	///////FIREBASE CALLS///////////////
		HeroFactory.getHero(key)
		.then(function(currHero) {
			HeroFactory.putLastHero(currHero.id);
			$scope.hero = currHero;
		});

		HeroFactory.getAbility(key)
		.then(function(currAbility){
			$scope.abilities = currAbility;
			$scope.tempCHA = "";
			$scope.tempCON = "";
			$scope.tempDEX = "";
			$scope.tempINT = "";
			$scope.tempSTR = "";
			$scope.tempWIS = "";
			$scope.CHA;
			$scope.CON;
			$scope.DEX;
			$scope.INT;
			$scope.STR;
			$scope.WIS;
		});
		
		HeroFactory.getMettle(key)
		.then(function(currMettle) {
			$scope.mettle = currMettle;
			$scope.mettle.currHealth = $scope.mettle.healthPoints;
			$scope.tempFortMod = "";
			$scope.tempRefMod = "";
			$scope.tempWillMod = "";
			$scope.tempCMB = "";
			$scope.tempCMD = "";
			$scope.tempAC = "";
			$scope.tempAB = "";
			$scope.originalSpeed = $scope.mettle.speed;
			$scope.mettle.dodgeBonus = $scope.mettle.dodge ? 1 : 0;
			$location.url("#/tracker/hero");
		});

		HeroFactory.getSkill(key)
		.then(function(currSkill) {
			$scope.skill = currSkill;
		});
	})
//////////////CONDITIONS///////////////////
	ConditionFactory.getConditions()
	.then(function(conditionArr) {
		$scope.conditions = conditionArr;
	});

// set inflicted conditions array
	$scope.setCondition = function(text, name) {
		let newObj = new Object();
			newObj.name = `${name}`
			newObj.text = `${text}`;

		$scope.inflictedConditions.push(newObj);
		$('.button-collapse').sideNav('hide');
	}
	// set text for bottom modal
	$scope.setText = function(text) {
		$scope.text = text;
		$('#modal1').openModal();
	}
	// remove specific condition
	$scope.removeCon = function(name) {
		let condition = false;
		$scope.ConditionSrv = new ConditionSrv($scope, name, condition);
		$scope.inflictedConditions.forEach(function(curr, index) {
			if (curr.name === name) {
				$scope.inflictedConditions.splice(index, 1)
			}
		})
	}
	// inflict condition
	$scope.inflict = function(name) {
		let condition = true;
		$scope.ConditionSrv = new ConditionSrv($scope, name, condition);
	}

//////////////ABILITY MODIFIERS///////////////////

	$scope.getMod = function(which, abl, temp) {
		if (temp === "") {
			temp = 0;
		};
		if (temp === "-") {
			return;
		};
		if (which === "CHA") {
			$scope.CHA   = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.CHA;
		}
		if (which === "CON") {
			$scope.CON  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.CON;
		}
		if (which === "DEX") {
			$scope.DEX  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			$scope.originalDEX = (Math.floor(parseInt(abl)/2) -5);
			return $scope.DEX;
		}
		if (which === "INT") {
			$scope.INT  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.INT;
		}
		if (which === "STR") {
			$scope.STR  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			$scope.originalSTR = (Math.floor(parseInt(abl)/2) -5);
			return $scope.STR;		
		}
		if (which === "WIS") {
			$scope.WIS  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.WIS;
		}
	};
//////////////INITIATIVE///////////////////
	$scope.initiative = function(a, b) {
		return parseInt(a) + parseInt(b);
	};
///////////////////HEALTH//////////////////
	$scope.conChange = function() {
		let temp = $scope.tempCON === "" ? $scope.originalConChange : $scope.tempCON;
		if (temp === "-") {
			return;
		} 
		let alter = temp * $scope.mettle.hitDice;
		$scope.mettle.currHealth = parseInt($scope.mettle.currHealth) + parseInt(alter);
		$scope.originalConChange = -temp;
	}


	$scope.applyChange = function(change) {
		let damage = parseInt(change) - $scope.mettle.damageReduction;
		$scope.mettle.currHealth =  parseInt($scope.mettle.currHealth) - damage; 
		if ($scope.mettle.currHealth > $scope.mettle.healthPoints) {
			$scope.mettle.currHealth = $scope.mettle.healthPoints;
		}
		$scope.healthChange = null;
	};

//////////////// ARMOR CLASS//////////////////////
	$scope.getAC = function() {
		let tempAC = $scope.tempAC;
		if (tempAC === "") {
			tempAC = 0;
		}
		return 	10 +
						parseInt($scope.mettle.armorBonus) +
						parseInt($scope.mettle.shieldBonus) +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.naturalArmor) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor) +
						parseInt($scope.DEX) +
						parseInt(tempAC);
	};
	

	$scope.flatFooted = function() {
		return  10 +
						parseInt($scope.mettle.armorBonus) +
						parseInt($scope.mettle.shieldBonus) +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.naturalArmor) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor)
	};

		$scope.touchAC = function() {
		return  10 +
						parseInt($scope.mettle.sizeMod) +
						parseInt($scope.mettle.deflectionMod) +
						parseInt($scope.mettle.MMArmor) +
						parseInt($scope.DEX) +
						parseInt($scope.mettle.dodgeBonus);

	};

/////////////// SAVING THROWS//////////////////////
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

//////////////////// COMBAT//////////////////////
	
	$scope.strAB = function() {
		let temp = $scope.tempAB;
		if (temp === ""){
			temp = 0;
		}
		return  parseInt($scope.mettle.baseAttackBonus) +
						parseInt($scope.STR) +
						parseInt($scope.mettle.sizeMod) +
						parseInt(temp);
	};


	$scope.dexAB = function() {
		let temp = $scope.tempAB;
		if (temp === ""){
			temp = 0;
		}
		return  parseInt($scope.mettle.baseAttackBonus) +
						parseInt($scope.DEX) +
						parseInt($scope.mettle.sizeMod) +
						parseInt(temp);
	};


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

///////////////// SKILL//////////////////////	
	$scope.skillTotal = function(a, b, c) {
		return parseInt(a) + parseInt(b) + parseInt(c);
	}

});