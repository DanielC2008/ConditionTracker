"use strict";

app.factory("HeroFactory", function(FirebaseURL, $q, $http, AuthFactory) {
	let heroKey = [];
	let editKey = [];
	////////////// GETTER/SETTER////////////
	const getHeroKey = function() {
		return heroKey[0];
	};

	const setHeroKey = function(id) {
		heroKey.splice(0, 1, id);
	};

	const getEditKey = function() {
		return editKey[0];
	};

	const setEditKey = function(id) {
		editKey.splice(0, 1, id);
	};

	const removeEditKey = function() {
		editKey.splice(0, 1);	
	};
	
////////////// POST////////////
	const postNewHero = function(newHero) {
		return $q(function(resolve, reject) {
			$http.post(`${FirebaseURL}/heros.json`, 
			JSON.stringify(newHero))
			.success(function(obj) {
				resolve(obj);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const postNewAbility = function(newAbility) {
		newAbility.heroKey = heroKey[0].id;
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
		newMettle.heroKey = heroKey[0].id;
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
		newSkill.heroKey = heroKey[0].id;
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
	const loginLastHero = function(uid) {
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros.json?orderBy="uid"&equalTo="${uid}"`)
			.success(function(obj) {
				resolve(obj);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const getLastHero = function() {
		let uid = AuthFactory.getUser();
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/lastHero/${uid}.json`)
			.success(function(obj) {
				if (obj !== null) {
				  heroKey.splice(0, 1, obj.id);
			  }
				resolve(obj);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const dropDown = function() {
		let uid = AuthFactory.getUser();
		let heroNames = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/heros.json?orderBy="uid"&equalTo="${uid}"`)
			.success(function(heros) {
				Object.keys(heros).forEach(function(key){
					heros[key].id=key;
					heroNames.push(heros[key]);
			});
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
				heroObj.id = key;
				let hero = heroObj;
				resolve(hero);
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
					heroAbl[obj].id = obj;
					let abilities = heroAbl[obj];
					resolve(abilities);
				}
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
					heroMet[obj].id = obj;
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
					heroSkill[obj].id = obj;
					let skill = heroSkill[obj];
					resolve(skill);
				}
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	////////////// DELETE////////////

		const deleteHero = function(id) {
		return $q(function(resolve, reject) {
			$http.delete(`${FirebaseURL}/heros/${id}.json`)
			.success(function() {
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const deleteAbility = function(id) {
		return $q(function(resolve, reject) {
			$http.delete(`${FirebaseURL}/abilities/${id}.json`)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const deleteMettle = function(id) {
		return $q(function(resolve, reject) {
			$http.delete(`${FirebaseURL}/mettle/${id}.json`)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const deleteSkill = function(id) {
		return $q(function(resolve, reject) {
			$http.delete(`${FirebaseURL}/skill/${id}.json`)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	////////////// PUT////////////
	const putLastHero = function(id) {
		let uid = AuthFactory.getUser();
		let newObj = {};
		newObj[`${uid}`] = {"id": `${id}`};
		return $q(function(resolve,reject) {
			$http.put(`${FirebaseURL}/lastHero.json`,
				newObj)
			.success(function(obj) {
				heroKey.splice(0, 1, obj[Object.keys(obj)[0]]);
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};


	const putHero = function(obj) {
		return $q(function(resolve, reject) {
			$http.put(`${FirebaseURL}/heros/${obj.id}.json`,
				obj)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const putAbility = function(obj) {
		return $q(function(resolve, reject) {
			$http.put(`${FirebaseURL}/abilities/${obj.id}.json`,
				obj)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const putMettle = function(obj) {
		return $q(function(resolve, reject) {
			$http.put(`${FirebaseURL}/mettle/${obj.id}.json`,
				obj)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	const putSkill = function(obj) {
		return $q(function(resolve, reject) {
			$http.put(`${FirebaseURL}/skill/${obj.id}.json`,
				obj)
			.success(function() {
					resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};



	return {postNewHero, postNewAbility, postNewMettle, postNewSkill, getHero, getHeroKey, getAbility, getMettle, getSkill, dropDown, setHeroKey, deleteHero, deleteAbility, deleteMettle, deleteSkill, setEditKey, getEditKey, putHero, putAbility, putMettle, putSkill, putLastHero, getLastHero, removeEditKey, loginLastHero};
});