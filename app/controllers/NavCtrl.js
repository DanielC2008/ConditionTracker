"use strict";

app.controller("NavCtrl", function($scope, AuthFactory, $location, HeroFactory) {
		
		HeroFactory.dropDown()
		.then(function(heros) {
			$scope.herosArray = heros; 
		});

		$scope.getHero = function(id) {
			HeroFactory.setHeroKey(id);
			$location.url("/tracker/hero");
		};

		$scope.logout = function() {
			AuthFactory.logout();
			$location.url("/login");
		};



});