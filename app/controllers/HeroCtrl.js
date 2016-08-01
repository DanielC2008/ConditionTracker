"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory) {

	let key = HeroFactory.getHeroKey();	



	HeroFactory.getHero(key)
	.then(function(currHero) {
		$scope.hero = currHero;
		$scope.hero.currHealth =$scope.hero.healthPoints;
	})
	.then(function(){
		HeroFactory.getAbility(key)
		.then(function(currAbility){
			$scope.getMod(currAbility);
			$scope.abilities = currAbility;
			$location.url("#/tracker/hero");
		})
	})


	$scope.getMod = function(abilities) {
		console.log(abilities);
		abilities.splice(6,2);
		abilities.forEach(function(currObj, index) {
			console.log(currObj);
			for (let ability in currObj) {
				if (index === 0) {
					$scope.CHA  = Math.floor(parseInt(currObj[ability])/2) -5;
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
		})
	}

	$scope.add = function(a, b) {
		return parseInt(a) + parseInt(b);
	}

	$scope.mod = function(value, tempMod) {
		if (!tempMod) {
			tempMod = 0;
		}
		return (Math.floor(value / 2) - 5) + parseInt(tempMod);
	}

	$scope.applyChange = function(change) {
		$scope.hero.currHealth = parseInt($scope.hero.currHealth) - parseInt(change); 
		$scope.healthChange = null;

	}


});