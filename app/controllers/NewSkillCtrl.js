"use strict";

app.controller("NewSkillCtrl", function($scope, AuthFactory, HeroFactory, $location) {
	$scope.edit = false;
	let editKey = HeroFactory.getEditKey();
	if (editKey) {
		HeroFactory.getSkill(editKey)
		.then(function(obj) {
			$scope.newSkill = obj;
			$scope.edit = true;
		})
	}


	$scope.addNewSkill = function() {
		for (let item in $scope.newSkill) {
			if ($scope.newSkill[item] === null) {
			$scope.newSkill[item] = 0;
			}
		}
		$scope.newSkill.uid = AuthFactory.getUser();
		HeroFactory.postNewSkill($scope.newSkill)
		.then(function() {
			$location.url("/tracker/hero");
		});
	};


	$scope.editSkill = function() {
		HeroFactory.putSkill($scope.newSkill)
		.then(function() {
			HeroFactory.removeEditKey();
			$location.url("/tracker/hero");
		});
	};


	$scope.newSkill = {
		acrobatics : false,
		acrobaticsRanks : null,
		acrobaticsMM : null,
		appraise : false,
		appraiseRanks : null,
		appraiseMM : null,
		bluff : false,
		bluffRanks : null,
		bluffMM : null,
		climb : false,
		climbRanks : null,
		climbMM : null,
		craft1 : false,
		craft1Type : null,
		craft1TypeRanks : null,
		craft1TypeMM : null,
		craft2 : false,
		craft2Type : null,
		craft2TypeRanks : null,
		craft2TypeMM : null,
		craft3 : false,
		craft3Type : null,
		craft3TypeRanks : null,
		craft3TypeMM : null,
		diplomacy : false,
		diplomacyRanks : null,
		diplomacyMM : null,
		disableDevice : false,
		disableDeviceRanks : null,
		disableDeviceMM : null,
		disguise : false,
		disguiseRanks : null,
		disguiseMM : null,
		escapeArtist : false,
		escapeArtistRanks : null,
		escapeArtistMM : null,
		fly : false,
		flyRanks : null,
		flyMM : null,
		handleAnimal : false,
		handleAnimalRanks : null,
		handleAnimalMM : null,
		heal : false,
		healRanks : null,
		healMM : null,
		intimidate : false,
		intimidateRanks : null,
		intimidateMM : null,
		knowArcana : false,
		knowArcanaRanks : null,
		knowArcanaMM : null,
		knowDungeon : false,
		knowDungeonRanks : null,
		knowDungeonMM : null,
		knowEngin : false,
		knowEnginRanks : null,
		knowEnginMM : null,
		knowGeography : false,
		knowGeographyRanks : null,
		knowGeographyMM : null,
		knowHistory : false,
		knowHistoryRanks : null,
		knowHistoryMM : null,
		knowLocal : false,
		knowLocalRanks : null,
		knowLocalMM : null,
		knowNature : false,
		knowNatureRanks : null,
		knowNatureMM : null,
		knowNobility : false,
		knowNobilityRanks : null,
		knowNobilityMM : null,
		knowPlanes : false,
		knowPlanesRanks : null,
		knowPlanesMM : null,
		knowReligion : false,
		knowReligionRanks : null,
		knowReligionMM : null,
		linguistics : false,
		linguisticsRanks : null,
		linguisticsMM : null,
		perception : false,
		perceptionRanks : null,
		perceptionMM : null,
		perform1 : false,
		perform1Type : null,
		perform1TypeRanks : null,
		perform1TypeMM : null,
		perform2 : false,
		perform2Type : null,
		perform2TypeRanks : null,
		perform2TypeMM : null,
		profession1 : false,
		profession1Type : null,
		profession1TypeRanks : null,
		profession1TypeMM : null,
		profession2 : false,
		profession2Type : null,
		profession2TypeRanks : null,
		profession2TypeMM : null,
		ride : false,
		rideRanks : null,
		rideMM : null,
		senseMotive : false,
		senseMotiveRanks : null,
		senseMotiveMM : null,
		sleightOfHand : false,
		sleightOfHandRanks : null,
		sleightOfHandMM : null,
		spellCraft : false,
		spellCraftRanks : null,
		spellCraftMM : null,
		stealth : false,
		stealthRanks : null,
		stealthMM : null,
		survival : false,
		survivalRanks : null,
		survivalMM : null,
		swim : false,
		swimRanks : null,
		swimMM : null,
		useMagicDevice : false,
		useMagicDeviceRanks : null,
		useMagicDeviceMM : null
	};
});
		


