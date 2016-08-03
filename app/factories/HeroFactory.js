"use strict";

app.factory("HeroFactory", function(FirebaseURL, $q, $http) {
	let heroKey = [];
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

	const postNewSkill = function(newSkill) {
		newSkill.heroKey = heroKey[0];
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/skill.json`, 
			JSON.stringify(newSkill))
			.success(function() {
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};


////////////// GET////////////

	const dropDown = function() {
		let heroNames = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros.json`)
			.success(function(heros) {
				console.log(heros);
				Object.keys(heros).forEach(function(key){
					heros[key].id=key;
					heroNames.push(heros[key]);
			});
				console.log(heroNames, "heros");
				resolve(heros);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

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
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/abilities.json?orderBy="heroKey"&equalTo="${key}"`)
			.success(function(heroAbl) {
				for (let obj in heroAbl) {
					let abilities = heroAbl[obj];
					resolve(abilities);
				};
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getMettle = function(key) {
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/mettle.json?orderBy="heroKey"&equalTo="${key}"`)
			.success(function(heroMet) {
				for (let obj in heroMet) {
					let mettle = heroMet[obj];
					resolve(mettle);
				}
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getSkill = function(key) {
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/skill.json?orderBy="heroKey"&equalTo="${key}"`)
			.success(function(heroSkill) {
				for (let obj in heroSkill) {
					let skill = heroSkill[obj];
					resolve(skill);
				}
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getHeroKey = function() {
		return heroKey[0];
	};

	const setHeroKey = function(id) {
		heroKey.splice(0, 1, id);
	};


	return {postNewHero, postNewAbility, postNewMettle, postNewSkill, getHero, getHeroKey, getAbility, getMettle, getSkill, dropDown, setHeroKey};
});