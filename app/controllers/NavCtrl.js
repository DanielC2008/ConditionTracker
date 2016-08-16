"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, $location, $window, HeroFactory) {

		HeroFactory.dropDown()
		.then(function(heros) {
			$scope.herosArray = heros; 
		});

		$scope.getHero = function(id) {
			HeroFactory.putLastHero(id)
			.then(function() {
			$window.location.reload();	
			$location.url("/tracker/hero");
			});
		};

		$scope.logout = function() {
			AuthFactory.logout();
			$location.url("/login");
		};


		$scope.editHero = function() {
			let editKey = HeroFactory.getHeroKey();
			HeroFactory.setEditKey(editKey);
			if (editKey) {
				$location.url("/tracker/newHero");
			}	
		};

		$scope.addHero = function() {
			HeroFactory.removeEditKey();
			$location.url("/tracker/newHero");
		};


		$scope.deleteHero = function(id) {
			let abilityId;
			let	mettleId;
			let skillId;
			HeroFactory.deleteHero(id)
			.then(function() {
				HeroFactory.getAbility(id)
				.then(function(ablId){
					abilityId = ablId.id;
					HeroFactory.deleteAbility(abilityId)
					.then(function() {
					});
				});
				HeroFactory.getMettle(id)
				.then(function(metId){
					mettleId = metId.id;
					HeroFactory.deleteMettle(mettleId)
					.then(function() {
					});
				});
				HeroFactory.getSkill(id)
				.then(function(sklId){
					skillId = sklId.id;
					HeroFactory.deleteSkill(skillId)
					.then(function() {
					$window.location.reload();
					});
				});
			});
		};


});