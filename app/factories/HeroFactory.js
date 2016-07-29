"use strict";

app.factory("HeroFactory", function(FirebaseURL, $q, $http) {

	const postNewHero = function(newHero) {
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/heros.json`, 
			JSON.stringify(newHero))
			.success(function() {
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getHero = function() {
		let hero = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros.json`)
			.success(function(heroObj) {
				let currHero = heroObj;
				Object.keys(currHero).forEach(function(key){
					currHero[key].id = key;
					hero.push(currHero[key]);
				});
				resolve(hero);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};


	return {postNewHero, getHero};
});