"use strict";

app.factory("HeroFactory", function(FirebaseURL, $q, $http) {
	let heroKey = ["-KNxlW-XapQ4J1EfFst8"];
////////////// POST////////////
	const postNewHero = function(newHero) {
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/heros.json`, 
			JSON.stringify(newHero))
			.success(function(obj) {
				heroKey.splice(0,1,obj.name);
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const postNewAbility = function(newAbility) {
		newAbility.heroKey = heroKey[0];
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/abilities.json`, 
			JSON.stringify(newAbility))
			.success(function() {
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};


////////////// GET////////////
	const getHero = function(key) {
		let hero = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros/${key}.json`)
			.success(function(heroObj) {
				
				// let currHero = heroObj;
				// Object.keys(currHero).forEach(function(key){
				// 	hero.push(currHero[key]);
				// });
				resolve(heroObj);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getAbility = function(key) {
		let abilities = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/abilities.json?orderBy="heroKey"&equalTo="${key}"`)
			.success(function(heroAbl) {
				for (let obj in heroAbl) {
					Object.keys(heroAbl[obj]).forEach(function(curr, index) {
						let currObj = {};
						currObj[`${curr}`] = heroAbl[obj][curr];
						abilities.push(currObj);
					})
				}
				resolve(abilities);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};


	const getHeroKey = function() {
		return heroKey[0];
	};

	// const setHeroKey = function() {

	// };


	return {postNewHero, postNewAbility, getHero, getHeroKey, getAbility};
});