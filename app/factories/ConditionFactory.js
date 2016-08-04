"use strict";

app.factory("ConditionFactory", function($q, $http, FirebaseURL) {

	const getConditions = function() {
		let conditionsArray = [];
		return $q(function(resolve, reject) {
			$http.get(`${FirebaseURL}/conditions.json`)
			.success(function(conditionsObj) {
				for (let cond in conditionsObj) {
					conditionsArray.push(conditionsObj[cond])
				};
				resolve(conditionsArray);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	return{ getConditions}
});