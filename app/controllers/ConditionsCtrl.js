"use strict";

app.controller("ConditionsCtrl", function($scope, ConditionFactory) {
	$scope.text = "";

	$scope.setText = function(text) {
		$scope.text = text;
	}

	ConditionFactory.getConditions()
	.then(function(conditionArr) {
		$scope.conditions = conditionArr;
	});

});