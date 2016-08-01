"use strict";

app.controller("HeroCtrl", function($scope, $location, HeroFactory) {

	let key = HeroFactory.getHeroKey();	



	HeroFactory.getHero(key)
	.then(function(currHero) {
		$scope.hero = currHero;
	})
	.then(function(){
		HeroFactory.getAbility(key)
		.then(function(currAbility){
			$scope.getMod(currAbility);
			$scope.abilities = currAbility;
		})
	})
	.then(function() {
		HeroFactory.getMettle(key)
		.then(function(currMettle) {
		console.log(currMettle);	
		$scope.mettle = currMettle;
		$scope.mettle.currHealth =$scope.mettle.healthPoints;
		$location.url("#/tracker/hero");
		})
	})


	$scope.getMod = function(abilities) {
		abilities.splice(6,2);
		abilities.forEach(function(currObj, index) {
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
		});
	};

	$scope.add = function(a, b) {
		return parseInt(a) + parseInt(b);
	};

	// $scope.mod = function(value, tempMod) {
	// 	if (!tempMod) {
	// 		tempMod = 0;
	// 	}
	// 	return (Math.floor(value / 2) - 5) + parseInt(tempMod);
	// };

	$scope.applyChange = function(change) {
		$scope.mettle.currHealth = parseInt($scope.mettle.currHealth) - parseInt(change); 
		$scope.healthChange = null;
	};

	$scope.tempMod = function(key, temp) {
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


});