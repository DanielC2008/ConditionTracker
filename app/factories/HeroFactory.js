"use strict";

app.factory("HeroFactory", function(FirebaseURL, $q, $http) {
	let heroKey = ["-KO34xdQPyIBv-WNjMaE"];
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

	const postNewMettle = function(newMettle) {
		newMettle.heroKey = heroKey[0];
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/mettle.json`, 
			JSON.stringify(newMettle))
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
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros/${key}.json`)
			.success(function(heroObj) {
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
					Object.keys(heroAbl[obj]).forEach(function(curr) {
						let currObj = {};
						currObj[`${curr}`] = heroAbl[obj][curr];
						abilities.push(currObj);
					});
				}
				resolve(abilities);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getMettle = function(key) {
		console.log(key);
		// let abilities = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/mettle.json?orderBy="heroKey"&equalTo="${key}"`)
			.success(function(heroMet) {
				for (let obj in heroMet) {
					let mettle = heroMet[obj];
					resolve(mettle);
				}
					// Object.keys(heroAbl[obj]).forEach(function(curr, index) {
					// 	let currObj = {};
					// 	currObj[`${curr}`] = heroAbl[obj][curr];
					// 	abilities.push(currObj);
					// })
				// }
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


	return {postNewHero, postNewAbility, postNewMettle, getHero, getHeroKey, getAbility, getMettle};
});