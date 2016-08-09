"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory, ConditionFactory, ConditionSrv) {
	let key = HeroFactory.getHeroKey();	

//////////////CONDITIONS///////////////////
	$scope.inflictedConditions = [];
	// only show conditions if charcter clicked
	$scope.conditionList = false;
	$('.modal-trigger').leanModal();
	$(".button-collapse").sideNav();
	$scope.text = null;


	$scope.addOnClick = function(event) {
		if (event.offsetX === 0) {
		$scope.conditionsList = true;
		}
	}
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
		console.log($scope.inflictedConditions.length);
		
	}

	$scope.setText = function(text) {
		$scope.text = text;
		$('#modal1').openModal();
	}


	$scope.removeCon = function() {
		console.log();
		// $scope.ConditionSrv = new ConditionSrv($scope, name);
		$scope.text = null;
	}


	$scope.inflict = function(name) {
			$scope.ConditionSrv = new ConditionSrv($scope, name);
	}


///////FIREBASE CALLS///////////////
	HeroFactory.getHero(key)
	.then(function(currHero) {
		$scope.hero = currHero;
	})

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
	})
	
	HeroFactory.getMettle(key)
	.then(function(currMettle) {
		$scope.mettle = currMettle;
		$scope.mettle.currHealth =$scope.mettle.healthPoints;
		$scope.tempFortMod = "";
		$scope.tempRefMod = "";
		$scope.tempWillMod = "";
		$scope.tempCMB = "";
		$scope.tempCMD = "";
		if ($scope.mettle.dodge){
			$scope.mettle.dodgeBonus = 1 ;
		}
		$location.url("#/tracker/hero");
	})

	HeroFactory.getSkill(key)
	.then(function(currSkill) {
		$scope.skill = currSkill;
	})


	$scope.getMod = function(which, abl, temp) {
		if (temp === "") {
			temp = 0;
		};
		if (temp === "-") {
			temp = 0;
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
			return $scope.DEX;
		}
		if (which === "INT") {
			$scope.INT  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.INT;
		}
		if (which === "STR") {
			$scope.STR  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.STR;		
		}
		if (which === "WIS") {
			$scope.WIS  = (Math.floor(parseInt(abl)/2) -5) + parseInt(temp);
			return $scope.WIS;
		}
	};

	$scope.add = function(a, b) {
		return parseInt(a) + parseInt(b);
	};

	$scope.applyChange = function(change) {
		$scope.mettle.currHealth = parseInt($scope.mettle.currHealth) - parseInt(change); 
		$scope.healthChange = null;
	};

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

// SKILL//////////////////////	
	$scope.skillTotal = function(a, b, c) {
		return parseInt(a) + parseInt(b) + parseInt(c);
	}

});