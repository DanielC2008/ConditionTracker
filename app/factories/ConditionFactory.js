"use strict";

app.factory("ConditionFactory", function($q, $http, FirebaseURL) {

	const getConditions = function() {
		let conditionsArray = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/conditions.json`)
			.success(function(conditionsObj) {
				for (let cond in conditionsObj) {
					conditionsArray.push(conditionsObj[cond]);
				}
				conditionsArray.sort(function(a,b) {
  				if (a.name < b.name) {
   				 return -1;
  				}
  				if (a.name > b.name){
   				 return 1;
  				}
  				return 0;
				});
				resolve(conditionsArray);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	return{getConditions};
});